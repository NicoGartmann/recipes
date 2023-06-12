const { Router } = require('express')
const Unit = require('../../models/Unit')
const Recipe = require("../../models/Recipe");

const router = Router();

router.get('/', async (req, res) => {
    try {
        const unitList = await Unit.find();
        if (!unitList) throw new Error('No Units found');
        res.status(200).json(unitList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, ses) => {
    const newUnit = new Unit(req.body);
    try {
        const unit = await newUnit.save();
        if(!unit) throw new Error("Something went wrong saving the Unit.");
        res.status(200).json(unit);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});