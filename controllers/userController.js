const { model } = require('mongoose');
const User = require('../models/userModel');

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
    getUsers,
    createUser,
}