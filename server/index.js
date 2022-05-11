require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const path = require('path')

const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.use(fileUpload({}))
/*app.use('/api', router)*/
app.use('/', (req, res) => {
    res.status(200).json({message: "main"})
})

//Обработка ошибок, самый последний use
app.use(errorHandler)

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

