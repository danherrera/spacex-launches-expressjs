import express from 'express'
const router = express.Router()
import launch_model from './models/launch.js'
import data from '../seed-data.json'

async function isDatabaseEmpty() {
    const launches = await launch_model.getAll()
    return launches.length === 0
}

async function runSetup() {
    console.log('Clearing database...')
    await launch_model.deleteAll()
    console.log('Populating database...')
    for (const item of data) {
        await launch_model.insertWithId({
            id: item.flight_number,
            rocket_name: item.rocket.rocket_name,
            rocket_type: item.rocket.rocket_type,
            launch_date: new Date(item.launch_date_utc),
            details: item.details,
            article_link: item.links.article_link,
            reddit_launch_link: item.links.reddit_launch
        })
    }
    console.log('Populated database!')
}

router.get('/', async (req, res) => {
    try {
        runSetup()
        res.status(200).json({
            message: 'Successfully completed setup'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

export default router
export {
    runSetup,
    isDatabaseEmpty
}