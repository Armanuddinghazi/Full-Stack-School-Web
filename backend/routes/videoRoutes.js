const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// Get All Videos
router.get('/', async (req, res) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add Video (Admin Side ke liye)
router.post('/', async (req, res) => {
    const { videoUrl, title } = req.body;
    try {
        const newVideo = new Video({ videoUrl, title });
        await newVideo.save();
        res.status(201).json(newVideo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// 3. Update/Edit Video
router.put('/:id', async (req, res) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedVideo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. Delete Video
router.delete('/:id', async (req, res) => {
    try {
        await Video.findByIdAndDelete(req.params.id);
        res.json({ message: 'Video deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;