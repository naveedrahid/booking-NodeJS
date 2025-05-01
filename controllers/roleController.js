const Role = require('../models/roleModel');

const role = {

    view: async (req, res) => {
        try {
            const viewRoles = await Role.find({ is_deleted: false });
            if (!viewRoles || viewRoles.length === 0) return res.status(404).json({ message: 'No roles found' });
            res.json(viewRoles);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    },

    viewById: async (req, res) => {
        try {
            const viewRoles = await Role.findById(req.params.id).where({ is_deleted: false });
            if (!viewRoles) return res.status(404).json({ message: 'Role not found' });
            res.json(viewRoles);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching role',
                error: error.message
            });
        }
    },

    create: async (req, res) => {
        try {
            const newRole = await Role.create({
                name: req.body.name,
                permissions: req.body.permissions
            });

            res.status(201).json({
                message: 'Role created successfully',
                data: newRole
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, permissions } = req.body;

            const updateRole = await Role.findByIdAndUpdate(
                id,
                {
                    name,
                    permissions
                },
                {
                    new: true,
                    runValidators: true
                }
            ).where({ is_deleted: false });

            if (!updateRole) return res.status(404).json({ message: 'Role not found' });

            return res.status(200).json({
                message: 'Role updated successfully',
                data: updateRole
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Error updating role',
                error: error.message
            })
        }
    },

    delete: async (req, res) => {
        try {

            const { id } = req.params;
            const deleteRole = await Role.findById(id);
            if (!deleteRole || deleteRole.is_deleted) return res.status(404).json({ message: 'Role not found or already deleted' });

            deleteRole.is_deleted = true;
            deleteRole.deleted_at = new Date();

            await deleteRole.save();
            return res.status(200).json({
                message: 'Role deleted successfully',
                data: deleteRole
            });

        } catch (error) {
            res.status(500).json({
                message: 'Error deleting role',
                error: error.message
            });
        }
    },
}

module.exports = role;
