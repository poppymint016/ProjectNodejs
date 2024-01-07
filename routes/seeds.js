const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const seed = require('../models/seed.js');
const auth = require('../middleware/auth'); 

router.use(auth);

router.get('', async (req, res, next) => {
    try {

        const seeds = await seed.find();
        res.json(seeds);

    } catch (error) {
        next(error);
    }
});

router.post('', async (req, res, next) => {
    try {

        const newSeed = await seed.create(req.body);
        res.status(201).json(newSeed)

    } catch (error) {
        console.error('Error creating seed:', error);
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const updatedSeed = await seed.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSeed) {
            return res.status(404).json({ message: 'Seed not found' });
        }
        res.json(updatedSeed);
    } catch (error) {
        console.error('Error updating seed:', error);
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedSeed = await seed.findByIdAndDelete(req.params.id);
        if (!deletedSeed) {
            return res.status(404).json({ message: 'Seed not found' });
        }
        res.json({ message: 'Seed deleted successfully' });
    } catch (error) {
        console.error('Error deleting seed:', error);
        next(error);
    }
});


module.exports = router;