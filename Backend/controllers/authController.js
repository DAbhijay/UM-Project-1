const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/response');


// ------ REGISTER USER ---------

exports.register = async (req,res) => {
    try {
        const { email, password, full_name, role } = req.body;

        const user = await authService.registerUser({
            email, password, full_name, role
        });

        return successResponse(res, 201, 'User registered successfully', {
            id:             user.id,
            email:          user.email,
            full_name:      user.full_name,
            role:           user.role
        });
    } catch (err) {
        return errorResponse(res, err);
    }
};

// ------ LOGIN USER ---------

exports.login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.loginUser({ email, password });

        return successResponse(res, 200, 'Login successful', {
            id:             user.id,
            email:          user.email,
            full_name:      user.full_name,
            role:           user.role
        });

    } catch (err) {
        return errorResponse(res, err);
    }
};