const jwt       = require('jsonwebtoken');
const { User }  = require('../models');
const AppError  = require('../utils/AppError');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async ( req, res, next ) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('No token provided', 401);
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new AppError('User no longer exists', 401);
        }

        req.user = user;
        next();

    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json ({success: false, message: 'Invalid or expired token'})
        }
        return res.status(err.statusCode || 500).json({success: false, message: err.message});
    }
};