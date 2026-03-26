const serviceService                        = require('../services/serviceService');
const { successResponse, errorResponse }    = require('../utils/response');
const { ServiceRequest, User, ServiceProvider } = require('../models');

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

exports.getMyRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let whereClause = {};
    
    if (userRole === 'customer') {
      whereClause.customer_id = userId;
    } else if (userRole === 'provider') {
      const provider = await ServiceProvider.findOne({ where: { user_id: userId } });
      if (!provider) {
        return res.status(404).json({ success: false, message: 'Provider profile not found' });
      }
      whereClause.provider_id = provider.id;
    }

    const requests = await ServiceRequest.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'customer', attributes: ['id', 'full_name', 'email', 'phone'] },
        { model: ServiceProvider, as: 'provider', include: [{ model: User, as: 'user', attributes: ['full_name'] }] }
      ],
      order: [['created_at', 'DESC']]
    });

    return res.status(200).json({ success: true, data: requests });
  } catch (error) {
    console.error('Error fetching service requests:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch service requests' });
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