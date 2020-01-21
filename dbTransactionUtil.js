const createClient = require('./databaseClient')

const util = {
    runTransaction: async (func) => {
        return await transaction(func)
    }
}

async function transaction(func) {
    const client = createClient()
    try {
        await client.connect()
        await client.query("BEGIN")
        const value = await func(client)
        await client.query("COMMIT")
        return value
    } catch (ex) {
        console.log(ex)
        await client.query("ROLLBACK")
    } finally {
        client.end()
    }
}

module.exports = util