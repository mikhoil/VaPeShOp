require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors)
app.use(express.json())

app.get('/', (req, res) => {
    res.send({msg: "get"})
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log("Connected to DB")
        app.listen(PORT, () => {
            console.log(`Server start at port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

