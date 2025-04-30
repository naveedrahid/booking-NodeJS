const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Role name is required'],
        trim: true,
        unique: [true, 'Role name must be unique'],
        minLength: [3, 'Role name must be at least 3 characters'],
        maxLength: [50, 'Role name must be less than 50 characters']
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    deleted_at: {
        type: Date,
        default: null
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
        required: [true, 'Permission ID is required']
    }]
}
    , {
        timestamps: true,
    });

module.exports = mongoose.model.Role || mongoose.model('Role', roleSchema);