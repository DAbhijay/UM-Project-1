const AppError = require('../utils/AppError');
const { ServiceProvider, User, Review } = require('../models');
const { successResponse, errorResponse } = require('../utils/response');

exports.getProviders = async (req, res) => {
  try {
    const { type } = req.query;

    const whereClause = {};
    if (type) {
      whereClause.service_type = type;
    }

    const providers = await ServiceProvider.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'full_name'],
        },
      ],
      order: [['rating', 'DESC']],
    });

    return successResponse(res, 200, 'Providers retrieved successfully', providers);
  } catch (err) {
    return errorResponse(res, err);
  }
};

exports.getProviderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await ServiceProvider.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'full_name'],
        },
        {
          model: Review,
          as: 'reviews',
          include: [
            {
              model: User,
              as: 'customer',
              attributes: ['full_name'],
            },
          ],
          limit: 10,
          order: [['created_at', 'DESC']],
        },
      ],
    });

    if (!provider) {
      throw new AppError('Provider not found', 404);
    }

    return successResponse(res, 200, 'Provider details retrieved successfully', provider);
  } catch (err) {
    return errorResponse(res, err);
  }
};