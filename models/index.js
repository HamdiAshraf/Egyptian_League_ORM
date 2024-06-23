const Sequelize = require('sequelize');
const db = require('../database')

const playerModel = require('../models/Players')
const teamModel = require('../models/Team')


//create models
const Player = playerModel(db, Sequelize)
const Team = teamModel(db, Sequelize)


//define relationship
Team.hasMany(Player, { foreignKey: 'teamId' });
Player.belongsTo(Team, { foreignKey: 'teamId' });





//generate tables in db
db.sync({ force: false }).then(() => {
    console.log(`tables created successfully!`);

})


module.exports = {
    Player,
    Team
}
