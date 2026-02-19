const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const AppError = require('../utils/AppError');

// ─── helpers ──────────────────────────────────────────────────

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

function generateToken (userId, role) {
    return jwt.sign(
        { id: userId,role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES  }
    );
}

// ─── register ──────────────────────────────────────────────────

exports.registerUser = async ({ email, password, full_name, role }) => {

    // Input Validation
    if (!email || !password || !full_name) {
        throw new AppError('Email, Password, Full Name are required', 400);
    }
    if (password.length < 6) {
        throw new AppError('Password must be 6 characters long', 400);
    }

    // Duplicate Check
    const existing = await User.findOne({ where: { email } });
    if (existing) {
        throw new AppError('Email already registered', 409);
    }    

    // Hash the password
    const password_hash = await bcrypt.hash(password, 10);

    // Persist
    const safeRole = ['customer', 'provider'].include(role) ? role: 'customer';

    const user = await User.create ({
        email,
        password,
        full_name,
        role: safeRole
    });

    return user;
};

// ─── login ──────────────────────────────────────────────────

exports.loginUser = async ({ email, password }) => {

    // Validate presence
    if (!email || !password) {
        throw new AppError('Email and Password are required', 400);
    }

    // Find user
    const user = await User.findOne({ where: { email } });

    // Compare password
    const passwordMatch = user
    ? await bcrypt.compare(password, user.password_hash)
    : false;

    if (!User || !passwordMatch) {
        throw new AppError('Invalid email or password', 401);
    }

    // Issue token
    const token = generateToken(user.id, user.role);

    return { user, token };
};