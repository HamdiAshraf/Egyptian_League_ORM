module.exports = (db, type) => {
    return db.define('players', {
        player_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        salary: {
            type: type.FLOAT,
            autoNull: false
        },
        date_of_birth: {
            type: type.DATE,
            autoNull: false
        },
        nationality: {
            type: type.STRING,
            autoNull: false,
            default: 'Egypt'
        },
        jersey_number: {
            type: type.INTEGER,
            autoNull: false
        },
        teamId: {
            type: type.INTEGER,
            references: {
                model: 'teams',
                key: 'teamId'
            }
        },
    })
}