import dotenv from 'dotenv'
import { pool } from './database.js'

dotenv.config()

const reset = async () => {
	await pool.query(`
		DROP TABLE IF EXISTS customcars;

		CREATE TABLE customcars (
			id SERIAL PRIMARY KEY,
			name TEXT NOT NULL,
			body_color TEXT NOT NULL,
			wheel_style TEXT NOT NULL,
			interior TEXT NOT NULL,
			"package" TEXT NOT NULL,
			spoiler TEXT NOT NULL,
			price INTEGER NOT NULL,
			image_url TEXT NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
		);
	`)

	console.log('customcars table reset')
	await pool.end()
}

reset().catch((error) => {
	console.error(error)
	pool.end()
})
