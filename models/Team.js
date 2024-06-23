module.exports = (db, type) => {
    return db.define('teams', {
        teamId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        city: {
            type: type.STRING,
            allowNull: false,
        },
        stadium: {
            type: type.STRING,
            allowNull: false,
        },
        established_year: {
            type: type.INTEGER,
            allowNull: false,
        },
        coach: {
            type: type.STRING,
            allowNull: false,
        },
        number_of_league_championship: {
            type: type.INTEGER,
            allowNull: false,
        },
        shirt_color: {
            type: type.STRING,
        }

    })
}




