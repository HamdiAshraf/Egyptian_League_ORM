const { Router } = require('express');
const router = Router();

const { getAllTeams, getTeam, changeTeamColor, getPlayersForTeam } = require('../controllers/team.controller')
// :teamId/players
router.route('/').get(getAllTeams)
router.route('/:teamId').get(getTeam).patch(changeTeamColor)
router.route('/:teamId/players').get(getPlayersForTeam)

module.exports = router;
