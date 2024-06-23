require('dotenv').config()

const
    express = require('express'),
    cors = require('cors'),
    PORT = process.env.PORT || 3000,
    app = express(),
    db = require('./database'),
    playerRoute=require('./routes/player.route'),
    teamRoute=require('./routes/team.route')


app.use(express.json())


//routes
app.use('/api/v1/teams',teamRoute)
app.use('/api/v1/players',playerRoute)



db.authenticate().then(
    console.log(`connected successfully to db`)

).catch((err) => console.log(err))

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})    