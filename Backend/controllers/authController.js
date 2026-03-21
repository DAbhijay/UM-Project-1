const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/response');
const AppError = require('../utils/AppError');


// ------ REGISTER USER ---------

exports.register = async (req, res) => {
    try {
        const { email, password, full_name, role } = req.body;

        const { user, token } = await authService.registerUser({  // ✅ Destructure user AND token
            email, password, full_name, role
        });

        return successResponse(res, 201, 'User registered successfully', {
            user: {
                id:        user.id,
                email:     user.email,
                full_name: user.full_name,
                role:      user.role
            },
            token: token  // ✅ Include the token!
        });
    } catch (err) {
        return errorResponse(res, err);
    }
};

// ------ LOGIN USER ---------

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.loginUser({ email, password });

        return successResponse(res, 200, 'Login successful', {
            user: {
                id:        user.id,
                email:     user.email,
                full_name: user.full_name,
                role:      user.role
            },
            token: token  // ✅ Include the token!
        });

    } catch (err) {
        return errorResponse(res, err);
    }
};

// ------ GET CURRENT USER PROFILE ---------

exports.getProfile = async (req, res) => {
    try {
        
        const user = req.user;

        return successResponse(res, 200, 'Profile retrieved successfully', {
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                role: user.role,
                created_at: user.created_at
            },
            
        });
    } catch (err) {
        return errorResponse(res, err);
    }
};

// ------ COMPLETE PROVIDER PROFILE ---------

exports.completeProviderProfile = async (req, res) => {
    try {
        const { service_type, bio, experience_years, hourly_rate } = req.body;
        const userId = req.user.id;

        // Validation
        if (!service_type || !bio || !experience_years || !hourly_rate) {
            throw new AppError('All fields are required', 400);
        }

        if (req.user.role !== 'provider') {
            throw new AppError('Only providers can create a profile', 403);
        }

        // Check if profile already exists
        const { ServiceProvider } = require('../models');
        const existingProfile = await ServiceProvider.findOne({ where: { user_id: userId } });
        
        if (existingProfile) {
            throw new AppError('Provider profile already exists', 409);
        }

        // Create provider profile
        const profile = await ServiceProvider.create({
            user_id: userId,
            service_type,
            bio,
            experience_years,
            hourly_rate
        });

        return successResponse(res, 201, 'Provider profile created successfully', {
            id: profile.id,
            user_id: profile.user_id,
            service_type: profile.service_type,
            bio: profile.bio,
            experience_years: profile.experience_years,
            hourly_rate: profile.hourly_rate,
            rating: profile.rating
        });
    } catch (err) {
        return errorResponse(res, err);
    }
};