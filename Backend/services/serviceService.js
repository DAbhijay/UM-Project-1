const {
    ServiceRequest,
    ServiceProvider,
    Availability,
    User
} = require('../models');

const { Op } = require('sequelize');
const AppError = require('../utils/AppError');

// ─── valid transitions map ────────────────────────────────────

const VALID_TRANSITIONS = {
    PENDING: ['ACCEPTED', 'REJECTED'],
    ACCEPTED: ['IN_PROGRESS'],
    IN_PROGRESS: ['COMPLETED']
};

// ─── create ────────────────────────────────────

exports.createServiceRequest = async ({
    customer_id, service_type, description, address, scheduled_at
}) => {

    // ─── validation ────────────────────────────────────

    if ( !service_type || !description || !address ) {
        throw new AppError('service_type, description, and address are required', 400);
    }

    const validTypes = ['electrician', 'plumber', 'carpenter', 'tailor', 'maintenance'];

    if (!validTypes.includes(service_type)) {
        throw new AppError('Invalid service_type', 400);
    }

    // ─── persist ────────────────────────────────────

    const request = await ServiceRequest.create({
        customer_id,
        service_type,
        description,
        address,
        status: 'PENDING',
        scheduled_at: scheduled_at || null
    });

    return request;

};

// ─── get by user (role-aware) ────────────────────────────────────

exports.getRequestByUser = async (userId, role) => {
    let whereClause;

    if ( role === 'provider' ) {
        const provider = await ServiceProvider.findOne({
            where: { user_id: userId }
        });
        if (!provider) {
            return [];
        }
        whereClause = { provider_id: provider.id };
    } else {
        whereClause = { customer_id: userId.id };
    }

    const request = await ServiceRequest.findAll({
        where: whereClause,
        order: [['created_at', 'DESC']],
        include: [
            { model: User,              as: 'customer', attributes: ['full_name', 'email' ]},
            { model: ServiceProvider,   as: 'provider' }
        ]
    });

    return request;
};

// ─── get single request ────────────────────────────────────

exports.getRequestById = async (requestId, requestingUser) => {
    const request = await ServiceRequest.findByPk(requestId, {
        include: [
            { model: User,              as: 'customer', attributes: ['full_name', 'email' ]},
            { model: ServiceProvider,   as: 'provider' }
        ]
    });

    if (!request) {
        throw new AppError('Service request not found', 404);
    }

    if (
        requestingUser.role === 'customer' && request.customer_id !== requestingUser.id
    ) {
        throw new AppError('Access Denied', 403);
    }

    return request;
};

// ─── update user ────────────────────────────────────

exports.updateStatus = async ({ requestId, newStatus, providerId, availabilitySlotId }) => {
    const request = await ServiceRequest.findByPk(requestId);

    if (!request) {
        throw new AppError('Service request not found', 404);
    }

    const provider = await ServiceProvider.findOne({
        where: { user_id: providerId }
    });
    if (!provider) {
        throw new AppError('Provider profile not found', 404);
    }
    
    const allowed = VALID_TRANSITIONS[request.status];
    if (!allowed) {
        throw new AppError(
            `Cannot move from ${request.status} to ${newStatus}. ` +
            `Allowed: ${allowed ? allowed.join(', '): 'none: (terminal state)'}`,
            400
        );
    }

    if (newStatus === 'ACCEPTED') {
        if (!availabilitySlotId) {
            throw new AppError('availability_slot_id is required when accepting', 400);
        }

        const slot = await Availability.findOne({
            where: {
                id:         availabilitySlotId,
                providerId: provider.id,
                is_booked:  false
            }
        });

        if (!slot) {
            throw new AppError('Slot not found, does not belong to you, or is already booked', 400);
        }

        await slot.update({ is_booked: true });

        await request.update({
            provider_id:    provider.id,
            status:         'ACCEPTED',
            scheduled_at:   `${slot.date}T${slot.start_time}`
        });
    }

    else if (newStatus === 'REJECTED') {
        await request.update({ status: 'REJECTED' });
    }

    else {
        if (request.provider_id !== provider.id) {
            throw new AppError('Only the assisted provider can update this request', 403);
        }

        await request.update({ status: newStatus });
    }

    await request.reload()
    return request;
};