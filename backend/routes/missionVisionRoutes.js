const express = require('express');
const router = express.Router();
const MissionVision = require('../models/MissionVision');

// GET ALL
router.get('/', async (req, res) => {
    try {
        const data = await MissionVision.find().sort({ order: 1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE
router.post('/', async (req, res) => {
    const newItem = new MissionVision({
        title: req.body.title,
        description: req.body.description,
        icon: req.body.icon,
        order: req.body.order
    });
    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await MissionVision.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        await MissionVision.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted Successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;