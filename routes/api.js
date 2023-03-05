// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Team = require('../models/team');

// Routes
router.get('/getAll', async (req, res) => {
    try {
        const data = await Team.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/addPlayer', async (req, res) => {
    const data = new Team({
        Name_of_Player: req.body.name,
        Role: req.body.role,
		Batting_Style: req.body.battingStyle,
		Bowling_Style: req.body.bowlingStyle
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await Team.findByIdAndUpdate(
            id, updatedData, options
        )
        
        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Team.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/getByRole/:role', async (req, res) => {
    try {
        const data = await Team.find({"Role": req.params.role});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/getByBattingStyle/:battingStyle', async (req, res) => {
    try {
        const data = await Team.find({"Batting_Style": req.params.battingStyle});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/getByStyle/:battingStyle/:bowlingStyle', async (req, res) => {	
	var battingStyle = req.params.battingStyle;
	var bowlingStyle = req.params.bowlingStyle;

    try {
        const data = await Team.find({"Batting_Style": battingStyle, "Bowling_Style": bowlingStyle});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/getEiterStyle/:battingStyle/:bowlingStyle', async (req, res) => {	
	var battingStyle = req.params.battingStyle;
	var bowlingStyle = req.params.bowlingStyle;

    try {
        const data = await Team.find({ $or: [ {"Batting_Style": battingStyle}, {"Bowling_Style": bowlingStyle} ]});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        const data = await Team.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// Return router
module.exports = router;
