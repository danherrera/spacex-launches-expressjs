import express from 'express'
const router = express.Router()
import launch_model from './models/launch.js'

// get all launches
router.get('/', async (req, res) => {
    try {
        res.status(200).json(await launch_model.getAll())
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// get launch by id
router.get('/:id', getLaunch, async (req, res) => {
    try {
        if (res.launch == undefined) {
            res.status(404).json()
        } else {
            res.status(200).json(res.launch)
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// create launch
router.post('/', async (req, res) => {
    try {
        let launch_id
        if (req.body.id != null) {
            launch_id = await launch_model.insertWithId({
                id: req.body.id,
                rocket_name: req.body.rocket_name,
                rocket_type: req.body.rocket_type,
                launch_date: new Date(req.body.launch_date),
                details: req.body.details,
                article_link: req.body.article_link,
                reddit_launch_link: req.body.reddit_launch_link
            })
        } else {
            launch_id = await launch_model.insert({
                rocket_name: req.body.rocket_name,
                rocket_type: req.body.rocket_type,
                launch_date: new Date(req.body.launch_date),
                details: req.body.details,
                article_link: req.body.article_link,
                reddit_launch_link: req.body.reddit_launch_link
            })
        }
        res.status(201).json({
            id: launch_id
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// update launch
router.patch('/:id', getLaunch, async (req, res) => {
    try {
        if (req.body.rocket_name != null) {
            res.launch.rocket_name = req.body.rocket_name
        }

        if (req.body.rocket_type != null) {
            res.launch.rocket_type = req.body.rocket_type
        }

        if (req.body.launch_date != null) {
            res.launch.launch_date = new Date(req.body.launch_date)
        }

        if (req.body.details != null) {
            res.launch.details = req.body.details
        }

        if (req.body.article_link != null) {
            res.launch.article_link = req.body.article_link
        }

        if (req.body.reddit_launch_link != null) {
            res.launch.reddit_launch_link = req.body.reddit_launch_link
        }

        const result = await launch_model.update(res.launch)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// delete launch
router.delete('/:id', async (req, res) => {
    console.log(`DELETE ONE`)
    try {
        const deletedRowCount = await launch_model.delete(req.params.id)
        if (deletedRowCount > 0) {
            res.status(204).json(result)
        } else {
            res.status(404).json()
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// delete all launches
router.delete('/', async (req, res) => {
    try {
        const deletedRowCount = await launch_model.deleteAll()
        res.status(200).json({deletedRowCount: deletedRowCount})
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

async function getLaunch(req, res, next) {
    let launch
    try {
        launch = await launch_model.get(req.params.id)
        if (launch == null) {
            return res.status(404).json({
                message: 'Cannot find launch'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
    res.launch = launch
    next()
}

export default router