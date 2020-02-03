import dbUtil from '../../dbTransactionUtil.js'

const table = 'launch'

const columns = [
  'rocket_name',
  'rocket_type',
  'launch_date',
  'details',
  'article_link',
  'reddit_launch_link',
  'any_parts_reused',
  'launch_success'
]

export default {
  get: async (id) => {
    return dbUtil.runTransaction(async (client) => {
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
    return dbUtil.runTransaction(async (client) => {
      const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES ('${launch.rocket_name}', '${launch.rocket_type}', '${launch.launch_date.toISOString()}', '${launch.details == null ? '' : launch.details.replace(/'/g, '\'\'')}', '${launch.article_link || ''}', '${launch.reddit_launch_link || ''}', ${launch.any_parts_reused}, ${launch.launch_success}) RETURNING *;`
      const result = await client.query(query)
      return result.rows[0].id
    })
  },
  insertWithId: async (launch) => {
    return dbUtil.runTransaction(async (client) => {
      const query = `INSERT INTO ${table} (id, ${columns.join(', ')}) VALUES (${launch.id}, '${launch.rocket_name}', '${launch.rocket_type}', '${launch.launch_date.toISOString()}', '${launch.details == null ? '' : launch.details.replace(/'/g, '\'\'')}', '${launch.article_link || ''}', '${launch.reddit_launch_link || ''}', ${launch.any_parts_reused}, ${launch.launch_success}) RETURNING *;`
      const result = await client.query(query)
      return result.rows[0].id
    })
  },
  update: async (launch) => {
    return dbUtil.runTransaction(async (client) => {
      const query = `UPDATE ${table} SET rocket_name = '${launch.rocket_name}', rocket_type = '${launch.rocket_type}', launch_date = '${launch.launch_date.toISOString()}', details = '${launch.details}', article_link = '${launch.article_link}', reddit_launch_link = '${launch.reddit_launch_link}, any_parts_reused = ${launch.any_parts_reused}, launch_success = ${launch.launch_success}' WHERE id = ${launch.id} RETURNING *;`
      const result = await client.query(query)
      return result.rows[0]
    })
  },
  delete: async (id) => {
    return dbUtil.runTransaction(async (client) => {
      const query = `DELETE FROM ${table} WHERE id = ${id};`
      const result = await client.query(query)
      return result.rowCount
    })
  },
  deleteAll: async () => {
    return dbUtil.runTransaction(async (client) => {
      const query = `DELETE FROM ${table} RETURNING *;`
      const result = await client.query(query)
      return result.rowCount
    })
  }
}
