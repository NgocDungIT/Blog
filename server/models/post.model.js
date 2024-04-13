const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    body: {
        type: String,
        required: [true, 'Please provide a content body'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updateAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Post', PostSchema);
