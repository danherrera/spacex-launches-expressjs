import dbUtil from '../../dbTransactionUtil.js'

const table = 'launch'

export default {
    get: async (id) => {
        return await dbUtil.runTransaction(async (client) => {
            const query = `SELECT * FROM ${table} WHERE id = ${id};`
            const result = await client.query(query)
            return result.rows[0]
        })
    },
    getAll: async () => {
        const value = await dbUtil.runTransaction(async (client) => {
            const query = `SELECT * FROM ${table};`
            const result = await client.query(query)
            return result.rows
        })
        return value
    },
    insert: async (launch) => {
        return await dbUtil.runTransaction(async (client) => {
            const query = `INSERT INTO ${table} (rocket_name, rocket_type, launch_date, details, article_link, reddit_launch_link) VALUES ('${launch.rocket_name}', '${launch.rocket_type}', '${launch.launch_date.toISOString()}', '${launch.details == null ? "" : launch.details.replace(/\'/g, '\'\'')}', '${launch.article_link || ""}', '${launch.reddit_launch_link || ""}') RETURNING *;`
            const result = await client.query(query)
            return result.rows[0].id
        })
    },
    insertWithId: async (launch) => {
        return await dbUtil.runTransaction(async (client) => {
            const query = `INSERT INTO ${table} (id, rocket_name, rocket_type, launch_date, details, article_link, reddit_launch_link) VALUES (${launch.id}, '${launch.rocket_name}', '${launch.rocket_type}', '${launch.launch_date.toISOString()}', '${launch.details == null ? "" : launch.details.replace(/\'/g, '\'\'')}', '${launch.article_link || ""}', '${launch.reddit_launch_link || ""}') RETURNING *;`
            const result = await client.query(query)
            return result.rows[0].id
        })
    },
    update: async (launch) => {
        return await dbUtil.runTransaction(async (client) => {
            const query = `UPDATE ${table} SET rocket_name = '${launch.rocket_name}', rocket_type = '${launch.rocket_type}', launch_date = '${launch.launch_date.toISOString()}', details = '${launch.details}', article_link = '${launch.article_link}', reddit_launch_link = '${launch.reddit_launch_link}' WHERE id = ${launch.id} RETURNING *;`
            const result = await client.query(query)
            return result.rows[0]
        })
    },
    delete: async (id) => {
        return await dbUtil.runTransaction(async (client) => {
            const query = `DELETE FROM ${table} WHERE id = ${id};`
            const result = await client.query(query)
            return result.rowCount
        })
    },
    deleteAll: async () => {
        return await dbUtil.runTransaction(async (client) => {
            const query = `DELETE FROM ${table} RETURNING *;`
            const result = await client.query(query)
            return result.rowCount
        })
    }
}