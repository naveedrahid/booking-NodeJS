const Permission = require('../models/permissionModel');

const permission = {

    view: async (req, res) => {
        try {
            const permissions = await Permission.find({ is_deleted: false });
            if (!permissions) return res.status(404).json({ message: 'No permissions found' });
            res.status(200).json({
                message: 'Permissions retrieved successfully',
                data: permissions
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message,
                message: 'An error occurred while retrieving permissions'
            });
        }
    },

    viewById: async (req, res) => {
        try {
            const { id } = req.params;
            const permissions = await Permission.findById(id).where({ is_deleted: false });
            if (!permissions) return res.status(404).json({ message: 'No permissions found' });
            res.status(200).json({
                message: 'Permissions retrieved successfully',
                data: permissions
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message,
                message: 'An error occurred while retrieving permissions'
            });
        }
    },

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
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const updatePermission = await Permission.findByIdAndUpdate(
                id,
                {
                    name: name

                },
                {
                    new: true,
                    runValidators: true
                }
            ).where({is_deleted: false});

            if(!updatePermission) return res.status(404).json({ message: 'Permission not found' });
            res.status(200).json({
                message: 'Permission updated successfully',
                data: updatePermission
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Error updating permission',
                error: error.message
            });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const permission = await Permission.findById(id);
            if (!permission || permission.is_deleted) return res.status(404).json({ message: 'Permission not found' });

            permission.is_deleted = true;
            permission.deleted_at = new Date();
            await permission.save();

            return res.status(200).json({
                message: 'Permission deleted successfully',
                data: permission
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Error deleting permission',
                error: error.message
            });
        }
    }
};

module.exports = permission;