const User = require('../models/userModel');
const Role = require('../models/roleModel');
const generateToken = require('../utils/generateToken');
const sendMail = require('../config/mailer');
const crypto = require('crypto');

const auth = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email }).select('+password');
            if (!user) return res.status(401).json({ message: 'Invalid email or password' });

            console.log('User found:', user); // Debug: Check user data and password

            const isMatch = await user.matchPassword(password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

            const token = generateToken(user._id);
            res.json({
                success: true,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role_id: user.role_id,
                },
            });

        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ message: 'User already exists with this email' });

            const defaultRole = await Role.findOne({ name: 'Subscriber' });
            if (!defaultRole) return res.status(500).json({ message: 'Default role "Subscriber" not found' });

            const newUser = new User({ name, email, password, role_id: defaultRole._id });
            await newUser.save();

            res.status(200).json({
                message: 'User registered successfully',
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: defaultRole.name,
                }
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    logout: async (req, res) => {
        try {
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            res.status(500).json({ message: 'Logout failed', error: error.message });
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'Email not found' });

            const resetToken = crypto.randomBytes(32).toString('hex');
            user.reset_token = resetToken;
            await user.save();

            const resetLink = `http://localhost:5000/api/reset-password/${resetToken}`;

            await sendMail({
                to: user.email,
                subject: 'Password Reset Request',
                text: 'Click the link to reset your password.',
                html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
            });

            res.status(200).json({ message: 'Reset email sent' });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { resetToken, newPassword } = req.body;
            const user = await User.findOne({ reset_token: resetToken }).select('+password');
            if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });

            // Directly updating password without hashing manually
            user.password = newPassword;
            user.reset_token = null; // Reset token after password reset
            await user.save(); // pre('save') will handle hashing

            res.status(200).json({ message: 'Password has been reset successfully.' });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

};

module.exports = auth;
