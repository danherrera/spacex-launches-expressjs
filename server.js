import dotenv from 'dotenv';
dotenv.config()

import createDatabaseClient from './databaseClient.js';
const client = createDatabaseClient()

import express from 'express'
const app = express()

client.connect()
    .then(() => console.log("Connected to database successfully"))
    .catch(e => console.error(`Failed to connect to database: ${e}`))
    .finally(() => client.end())

app.use(express.json())

import setupRouter, {
    isDatabaseEmpty,
    runSetup
} from './routes/setup.js'
app.use('/setup', setupRouter)
isDatabaseEmpty()
    .then(isEmpty => {
        if (isEmpty) {
            runSetup()
                .then(() => console.log("Completed setup"))
                .catch(err => console.log(`Encountered error with setup: ${err.message}`))
        }
    })
    .catch(err => console.log(`Failed to check if database is empty: ${err.message}`))

import launchesRouter from './routes/launches.js'
app.use('/launches', launchesRouter)

app.listen(3001, () => {
    console.log('Server started')
})