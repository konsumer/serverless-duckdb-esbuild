import { Database } from 'duckdb'
import { promisify } from 'util'

const db = new Database(':memory:', { allow_unsigned_extensions: 'true' })
const query = promisify(db.all.bind(db))

let isInitialized

async function setupDb () {
  if (!isInitialized) {
    await query('SET home_directory=\'/tmp\';')
    await query('INSTALL httpfs;')
    await query('LOAD httpfs;')
    await query('SET enable_http_metadata_cache=true;')
    await query('SET enable_object_cache=true;')
    isInitialized = true
  }
}

export async function customer (event, context) {
  if (!event.queryStringParameters.c) {
    throw new Error('Please set c param.')
  }

  await setupDb()
  const results = await query("SELECT * FROM 'https://shell.duckdb.org/data/tpch/0_01/parquet/customer.parquet' WHERE c_custkey=?;", event.queryStringParameters.c)

  return {
    statusCode: 200,
    body: JSON.stringify(results)
  }
}
