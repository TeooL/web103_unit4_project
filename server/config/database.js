import dotenv from 'dotenv'
import pg from 'pg'
import path from 'path'
import { fileURLToPath } from 'url'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.resolve(currentDirectory, '..', '.env') })

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
      rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)