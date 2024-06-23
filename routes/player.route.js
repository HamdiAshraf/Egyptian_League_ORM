const { Router } = require('express');
const router = Router();
const { getAllPlayers, getPlayerById, getPlayerByName, addPlayer, deletePlayer, transferPlayer, changePlayerSalary } = require('../controllers/player.controller')



router.route('/').get(getPlayerByName).post(addPlayer)
router.route('/:playerId').get(getPlayerById).delete(deletePlayer).patch(transferPlayer)




module.exports = router;