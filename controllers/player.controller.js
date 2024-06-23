const asyncHandler = require('express-async-handler')
const { Player, Team } = require('../models/index')





exports.getPlayerById = asyncHandler(async (req, res) => {
    try {
        if (!req.params.playerId) {
            res.status(400).json({ status: 'fail', message: 'invalid id' })
        }
        const result = await Player.findOne({
            where: { player_id: req.params.playerId }
        });
        res.status(200).json({ status: 'success', data: result })
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message })
    }
})


exports.getPlayerByName = asyncHandler(async (req, res) => {
    try {
        const playerName = req.query.name; // Extract name from query parameters

        // Validate that playerName is provided
        if (!playerName) {
            return res.status(400).json({ status: 'fail', message: 'name must be provided' });
        }

        // Find the player by name
        const result = await Player.findOne({
            where: { name: playerName }
        });

        // If no player found, return a 404 response
        if (!result) {
            return res.status(404).json({ status: 'fail', message: 'Player not found' });
        }

        // Respond with the player data
        res.status(200).json({ status: 'success', data: result });
    } catch (err) {
        // Handle any errors
        res.status(500).json({ status: 'error', message: err.message });
    }
});
exports.addPlayer = asyncHandler(async (req, res) => {
    try {
        const { name, salary, date_of_birth, nationality, jersey_number, teamId } = req.body;


        if (!name) {
            return res.status(400).json({ status: 'fail', message: 'Please provide name' });
        }
        if (salary == null) { // Checking for null or undefined
            return res.status(400).json({ status: 'fail', message: 'Please provide salary' });
        }
        if (!date_of_birth) {
            return res.status(400).json({ status: 'fail', message: 'Please provide date of birth' });
        }
        if (!nationality) {
            return res.status(400).json({ status: 'fail', message: 'Please provide nationality' });
        }
        if (jersey_number == null) { // Checking for null or undefined
            return res.status(400).json({ status: 'fail', message: 'Please provide jersey number' });
        }
        if (!teamId) {
            return res.status(400).json({ status: 'fail', message: 'Please provide teamId' });
        }


        const newPlayer = await Player.create({
            name,
            salary,
            date_of_birth,
            nationality,
            jersey_number,
            teamId,
            createdAt: new Date(), // Set createdAt timestamp
            updatedAt: new Date()
        });


        res.status(201).json({ status: 'success', data: newPlayer });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});



exports.deletePlayer = asyncHandler(async (req, res) => {
    try {
        const playerId = req.params.playerId;
        if (!playerId) {
            res.status(400).json({ status: 'fail', message: 'playerId must be provided' })
        }
        const player = await Player.findOne({
            where: { playerId: playerId }
        });
        if (!player) {
            res.status(400).json({ status: 'fail', message: 'there is no player for this id' })

        }
        await Player.destroy({
            where: { player_id: playerId }
        });
        res.status(204).json({})
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
})



exports.transferPlayer = asyncHandler(async (req, res) => {
    try {
        const playerId = req.params.playerId;
        const teamId = req.body.teamId;
        if (!playerId) {
            res.status(400).json({ status: 'fail', message: 'playerId must be provided' })
        }


        if (!teamId) {
            res.status(400).json({ status: 'fail', message: 'teamId must be provided' })
        }

        const player = await Player.findOne({
            where: {
                player_id: playerId
            }
        })
        if (!player) {
            res.status(400).json({ status: 'fail', message: 'there is no player for this id' })

        }

        player.teamId = teamId;

        const result = await player.save();
        res.status(200).json({ status: 'success', data: result });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
})






