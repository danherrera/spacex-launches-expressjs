import dotenv from 'dotenv'
import createDatabaseClient from './databaseClient.js'
import cors from 'cors'
import express from 'express'
import setupRouter, {
  isDatabaseEmpty,
  runSetup
} from './routes/setup.js'
import launchesRouter from './routes/launches.js'

const app = express()
const client = createDatabaseClient()
dotenv.config()

client.connect()
  .then(() => console.log('Connected to database successfully'))
  .catch(e => console.error(`Failed to connect to database: ${e}`))
  .finally(() => client.end())

app.use(express.json())
app.use(cors())

app.use('/reset', setupRouter)
isDatabaseEmpty()
  .then(isEmpty => {
    if (isEmpty) {
      runSetup()
        .then(() => console.log('Completed setup'))
        .catch(err => console.log(`Encountered error with setup: ${err.message}`))
    }
  })
  .catch(err => console.log(`Failed to check if database is empty: ${err.message}`))

app.use('/launches', launchesRouter)

const port = 3001

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}/`)
})
