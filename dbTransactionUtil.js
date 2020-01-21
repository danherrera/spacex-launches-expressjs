import createClient from './databaseClient.js'

export default {
    runTransaction: async (func) => {
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
}