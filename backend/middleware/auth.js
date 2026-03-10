const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ── Protect routes: validate JWT and attach user to req ───────────────────
const protect = async (req, res, next) => {
    let token;

    // Support both Authorization header and httpOnly cookie
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User belonging to this token no longer exists.' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not authorized. Token is invalid or expired.' });
    }
};

// ── Authorize roles: restrict access by role ──────────────────────────────
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role '${req.user.role}' is not authorized to access this resource.`,
            });
        }
        next();
    };
};

module.exports = { protect, authorize };
