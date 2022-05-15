require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const busboy = require('connect-busboy');
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const path = require('path')

const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 3001

const app = express()


app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(busboy());
app.use(fileUpload({}))
app.use('/api', router)

//Обработка ошибок, самый последнийse
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

