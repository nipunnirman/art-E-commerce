const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ── Helper: sign and send JWT token in response ────────────────────────────
const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(statusCode).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            createdAt: user.createdAt,
        },
    });
};

// ────────────────────────────────────────────────────────────────────────────────
// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
// ────────────────────────────────────────────────────────────────────────────────
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'An account with that email already exists.' });
        }

        // Create user (password is hashed by the User model pre-save hook)
        const user = await User.create({ name, email, password });

        sendTokenResponse(user, 201, res);
    } catch (error) {
        next(error);
    }
};

// ────────────────────────────────────────────────────────────────────────────────
// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
// ────────────────────────────────────────────────────────────────────────────────
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user — explicitly selecting the password field (it's hidden by default)
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
};

// ────────────────────────────────────────────────────────────────────────────────
// @route   GET /api/auth/me
// @desc    Get currently logged-in user profile
// @access  Private (requires valid JWT)
// ────────────────────────────────────────────────────────────────────────────────
const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

// ────────────────────────────────────────────────────────────────────────────────
// @route   PUT /api/auth/updateprofile
// @desc    Update logged-in user's name or avatar
// @access  Private
// ────────────────────────────────────────────────────────────────────────────────
const updateProfile = async (req, res, next) => {
    try {
        const fieldsToUpdate = {};
        if (req.body.name) fieldsToUpdate.name = req.body.name;
        if (req.body.avatar) fieldsToUpdate.avatar = req.body.avatar;

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

// ────────────────────────────────────────────────────────────────────────────────
// @route   PUT /api/auth/updatepassword
// @desc    Update logged-in user's password
// @access  Private
// ────────────────────────────────────────────────────────────────────────────────
const updatePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id).select('+password');

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
        }

        user.password = newPassword;
        await user.save(); // triggers the pre-save hash hook

        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, getMe, updateProfile, updatePassword };
