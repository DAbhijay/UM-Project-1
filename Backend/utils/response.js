// ─── success ────────────────────────────────────

exports.successResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

// ─── error ────────────────────────────────────

exports.errorResponse = (res, err) => {
    const statusCode    = err.statusCode || 500;
    const message       = err.statusCode ? err.message : 'Something went wrong on our end';

    if (process.env.NODE_ENV !== 'production') {
        console.error('[ERROR]', err);
    }

    return res.status(statusCode).json({
        success: false,
        message
    });
};