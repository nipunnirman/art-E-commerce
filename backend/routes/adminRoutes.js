const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ── POST /api/admin/seed ──────────────────────────────────────────────────
// One-time route to promote an existing user to admin role.
// In production, you'd remove this and seed via a DB script.
router.post('/seed', async (req, res, next) => {
    try {
        const { email, secret } = req.body;

        // Simple secret check to prevent random promotion
        if (secret !== process.env.JWT_SECRET) {
            return res.status(403).json({ success: false, message: 'Invalid secret.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        user.role = 'admin';
        await user.save();

        res.status(200).json({ success: true, message: `${user.name} (${user.email}) is now an admin.` });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
