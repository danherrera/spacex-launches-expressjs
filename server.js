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

import setupRouter from './routes/setup.js'
app.use('/setup', setupRouter)

import launchesRouter from './routes/launches.js'
app.use('/launches', launchesRouter)

app.listen(3001, () => {
    console.log('Server started')
})