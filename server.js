require('dotenv').config()

const client = require('./databaseClient')()
const express = require('express')
const app = express()

client.connect()
    .then(() => console.log("Connected to database successfully"))
    .catch(e => console.error(`Failed to connect to database: ${e}`))
    .finally(() => client.end())

app.use(express.json())

const setupRouter = require('./routes/setup')
app.use('/setup', setupRouter)

const launchesRouter = require('./routes/launches')
app.use('/launches', launchesRouter)

app.listen(3001, () => {
    console.log('Server started')
})