const Role = require('../models/roleModel');
const { post } = require('../utils/apiService');

const role = {
    create: async(req, res) => {
        try {
            const apiRes = await post('/roles', {
                name: req.body.name,
                permissions: req.body.permissions
            });

            res.status(201).json({
                message: 'Role created successfully',
                data: apiRes.data
            });
            
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = role;