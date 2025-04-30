const { model } = require('mongoose');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });

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
}

const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'User creation failed',
            error: error.message,
        });
    }
};

module.exports = {
    loginUser,
    getUsers,
    createUser,
}