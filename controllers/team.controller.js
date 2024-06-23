const asyncHandler = require('express-async-handler')
const { Player, Team } = require('../models/index')

exports.getAllTeams = asyncHandler(async (req, res) => {
    try {
        const result = await Team.findAll({});
        res.status(200).json({ status: 'success', data: result })
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message })
    }
})



exports.getTeam = asyncHandler(async (req, res) => {
    try {
        if (!req.params.teamId) {
            res.status(400).json({ status: 'fail', message: 'invalid id' })
        }
        const result = await Team.findOne({
            where: { teamId: req.params.teamId }
        });
        res.status(200).json({ status: 'success', data: result })
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message })
    }
})



exports.changeTeamColor = asyncHandler(async (req, res) => {
    try {
        const { shirt_color } = req.body;
        const teamId = req.params.teamId;


        if (!shirt_color) {
            return res.status(400).json({ status: 'fail', message: 'Please provide shirt_color' });
        }





        const team = await Team.findOne({
            where: {
                teamId: teamId,
            }
        });


        if (!team) {
            return res.status(404).json({ status: 'fail', message: 'Team not found' });
        }


        team.shirt_color = shirt_color;


        const result = await team.save();


        res.status(200).json({ status: 'success', data: result });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});


exports.getPlayersForTeam = asyncHandler(async (req, res) => {

    try {
        const { teamId } = req.params;
        const players = await Player.findAll(
            {
                where:
                    { teamId: teamId }
            });
        res.status(200).json({ status: 'success', data: players });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }



});