const cors = require('cors')
const express = require('express')
const db = require("./models")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World')
})

PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    db.sequelize.sync().then(() => {
        console.log(`Server is running on port ${PORT}`)
    })
})