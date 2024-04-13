const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        min: [6, 'Username must be more than 6 characters'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        min: [8, 'Password must be more than 8 characters'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('User', UserSchema);
