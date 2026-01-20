const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    videoUrl: {
        type: String,
        required: true // Admin youtube link dalega (e.g., https://youtu.be/xyz...)
    },
    title: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Video', VideoSchema);