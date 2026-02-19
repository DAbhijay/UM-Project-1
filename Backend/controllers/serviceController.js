const serviceService                        = require('../services/serviceService');
const { successResponse, errorResponse }    = require('../utils/AppError');

exports.createRequest = async (req, res) => {
    try{
        const { service_type, description, address, scheduled_at } = req.body;

        const request = await serviceService.createServiceRequest({
            customer_id: req.user.id,
            service_type,
            description,
            address,
            scheduled_at
        });

        return successResponse(res, 201, 'Service request created', request);
    } catch (err) {
        return errorResponse(res,err);
    }
};

exports.getMyRequests = async (req,res) => {
    try {
        const requests = await serviceService.getRequestByUser(req.user.id, req.user.role);

        return successResponse(res, 200, 'Service requests fetched', requests);
    } catch (err) {
        return errorResponse(res,err);
    }
};

exports.getRequestById = async (req,res) => {
    try {
        const request = await serviceService.getRequestById(req.params.id, req.user);

        return successResponse(res, 200, 'Service requests fetched', request);
    } catch (err) {
        return errorResponse(res,err);
    }
};

exports.updateStatus = async (req, res) => {
    try{
        const { status, availability_by_slot } = req.body;

        const updated = await serviceService.updateServiceStatus({
            requestId: req.params.id,
            newStatus: status,
            providerId: req.user.id,
            availabilitySlotId: availability_by_slot
        });

        return successResponse(res, 200, 'Status Updated', updated);
    } catch (err) {
        return errorResponse(res,err);
    }
};