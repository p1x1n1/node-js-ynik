const db = require('../db')

class BoquetCompositionController {
	async createBoquetComposition(req, res) {
		const { arc_boquets, id_type_flowers,count_ } = req.body
		let boquet
		if (arc_boquets && id_type_flowers) {
			boquet = await db.query('UPDATE boquets_composition set count_ = ($1) where arc_boquets = ($2) and id_type_flowers = ($3)  RETURNING *', [count_, arc_boquets ,id_type_flowers])
		} else {
			boquet = await db.query('INSERT INTO boquets_composition (arc_boquets,id_type_flowers,count_) values ($1, $2,$3) RETURNING *', [ arc_boquets ,id_type_flowers,count_])
		}
		res.json(boquet.rows[0])
	}
	async getBoquetCompositions(req, res) {
		const boquet = await db.query('SELECT * FROM boquets_composition ORDER BY arc_boquets,id_type_flowers ')
		res.json(boquet.rows)
	}
	async getOneBoquetComposition(req, res) {
		const arc_boquets = req.params.arc_boquets
		const boquet = await db.query('SELECT * FROM boquets_composition WHERE arc_boquets = ($1)',[arc_boquets])
		res.json(boquet.rows)
	}
	async getOneBoquetFlowerComposition(req, res) {
		const arc_boquets = req.params.arc_boquets
		const id_type_flowers = req.params.id_type_flowers
		const boquet = await db.query('SELECT * FROM boquets_composition WHERE arc_boquets = ($1) and id_type_flowers = ($2)',[arc_boquets,id_type_flowers])
		res.json(boquet.rows[0])
	}
	async deleteBoquetComposition(req, res) {
		const arc_boquets = req.params.arc_boquets
		const boquet = await db.query('DELETE FROM boquets_composition WHERE arc_boquets = ($1)',[arc_boquets])
		res.json({ success: true })
	}
	async deleteBoquetFlowerComposition(req, res) {
		const arc_boquets = req.params.arc_boquets
		const id_type_flowers = req.params.id_type_flowers
		const boquet = await db.query('DELETE FROM boquets_composition WHERE arc_boquets = ($1) and id_type_flowers = ($2)',[arc_boquets,id_type_flowers])
		res.json({ success: true })
	}
}

module.exports = new BoquetCompositionController()
