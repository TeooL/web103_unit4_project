import { pool } from '../config/database.js'

const wheelPriceMap = {
	standard: 0,
	sport: 1200,
	chrome: 1800,
	offroad: 1600,
	aero: 1400
}

const interiorPriceMap = {
	cloth: 0,
	leather: 1500,
	suede: 2200,
	carbon: 2600
}

const packagePriceMap = {
	city: 0,
	touring: 2400,
	adventure: 3200,
	track: 4100
}

const spoilerPriceMap = {
	none: 0,
	lip: 500,
	wing: 1100
}

const basePrice = 28000

const isImpossibleCombo = ({ wheel_style: wheelStyle, package: packageType, spoiler }) => {
	if (packageType === 'track' && wheelStyle === 'offroad') {
		return 'Track package cannot be paired with off-road wheels.'
	}

	if (packageType === 'adventure' && spoiler === 'wing') {
		return 'Adventure package cannot be paired with a wing spoiler.'
	}

	return ''
}

const calculatePrice = ({ wheel_style: wheelStyle, interior, package: packageType, spoiler }) => {
	return basePrice
		+ (wheelPriceMap[wheelStyle] ?? 0)
		+ (interiorPriceMap[interior] ?? 0)
		+ (packagePriceMap[packageType] ?? 0)
		+ (spoilerPriceMap[spoiler] ?? 0)
}

const buildImageUrl = ({ body_color: bodyColor, wheel_style: wheelStyle, interior }) => {
	const color = bodyColor || 'silver'
	const wheel = wheelStyle || 'standard'
	const cabin = interior || 'cloth'

	return `https://dummyimage.com/1200x600/${color}/ffffff.png&text=${color}+${wheel}+${cabin}`
}

export const getCars = async (_, res) => {
	try {
		const result = await pool.query('SELECT * FROM customcars ORDER BY id ASC')
		res.json(result.rows)
	} catch (error) {
		res.status(500).json({ error: 'Failed to load custom cars.' })
	}
}

export const getCar = async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM customcars WHERE id = $1', [req.params.id])

		if (!result.rows[0]) {
			return res.status(404).json({ error: 'Custom car not found.' })
		}

		res.json(result.rows[0])
	} catch (error) {
		res.status(500).json({ error: 'Failed to load custom car.' })
	}
}

export const createCar = async (req, res) => {
	try {
		const message = isImpossibleCombo(req.body)

		if (message) {
			return res.status(400).json({ error: message })
		}

		const price = calculatePrice(req.body)
		const imageUrl = buildImageUrl(req.body)
		const result = await pool.query(
			`INSERT INTO customcars
				(name, body_color, wheel_style, interior, "package", spoiler, price, image_url)
			 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			 RETURNING *`,
			[
				req.body.name,
				req.body.body_color,
				req.body.wheel_style,
				req.body.interior,
				req.body.package,
				req.body.spoiler,
				price,
				imageUrl
			]
		)

		res.status(201).json(result.rows[0])
	} catch (error) {
		res.status(500).json({ error: 'Failed to create custom car.' })
	}
}

export const updateCar = async (req, res) => {
	try {
		const message = isImpossibleCombo(req.body)

		if (message) {
			return res.status(400).json({ error: message })
		}

		const price = calculatePrice(req.body)
		const imageUrl = buildImageUrl(req.body)
		const result = await pool.query(
			`UPDATE customcars
			 SET name = $1,
				 body_color = $2,
				 wheel_style = $3,
				 interior = $4,
				 "package" = $5,
				 spoiler = $6,
				 price = $7,
				 image_url = $8
			 WHERE id = $9
			 RETURNING *`,
			[
				req.body.name,
				req.body.body_color,
				req.body.wheel_style,
				req.body.interior,
				req.body.package,
				req.body.spoiler,
				price,
				imageUrl,
				req.params.id
			]
		)

		if (!result.rows[0]) {
			return res.status(404).json({ error: 'Custom car not found.' })
		}

		res.json(result.rows[0])
	} catch (error) {
		res.status(500).json({ error: 'Failed to update custom car.' })
	}
}

export const deleteCar = async (req, res) => {
	try {
		const result = await pool.query('DELETE FROM customcars WHERE id = $1 RETURNING *', [req.params.id])

		if (!result.rows[0]) {
			return res.status(404).json({ error: 'Custom car not found.' })
		}

		res.json({ message: 'Custom car deleted.' })
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete custom car.' })
	}
}
