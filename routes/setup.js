import express from 'express'
const router = express.Router()
import launch_model from './models/launch.js'
import data from '../seed-data.json'

router.get('/', async (req, res) => {
    try {
        console.log('Setting up database')
        await launch_model.deleteAll()
        data.forEach(async (item, _) => {
            await launch_model.insertWithId({
                id: item.flight_number,
                rocket_name: item.rocket.rocket_name,
                rocket_type: item.rocket.rocket_type,
                launch_date: new Date(item.launch_date_utc),
                details: item.details,
                article_link: item.links.article_link,
                reddit_launch_link: item.links.reddit_launch
            })
        })
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