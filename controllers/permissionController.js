const Permission = require('../models/permissionModel');

const permission = {
    create: async (req, res) => {
        try {
            const newPermission = await Permission.create(req.body);
            res.status(201).json({
                message: 'Permission created successfully',
                data: newPermission
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
};

module.exports = permission;