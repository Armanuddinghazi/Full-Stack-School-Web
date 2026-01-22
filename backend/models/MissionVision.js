const mongoose = require('mongoose');

const MissionVisionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }, 
    order: { type: Number, default: 0 } 
});

module.exports = mongoose.model('MissionVision', MissionVisionSchema);