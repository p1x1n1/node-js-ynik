const db = require('../db')

class BoquetController {
	async createBoquet(req, res) {
		const { arc, name_,wrapper_, img } = req.body
		let boquet
		if (arc) {
			boquet = await db.query('UPDATE boquets set name_ = ($1),wrapper_ = ($2) ,img = ($3) where arc = ($4) RETURNING *', [name_, wrapper_ ,img,arc])
		} else {
			boquet = await db.query('INSERT INTO boquets (name_,wrapper_ ,img) values ($1, $2,$3) RETURNING *', [name_, wrapper_, img])
		}
		res.json(boquet.rows[0])
	}
	async getBoquets(req, res) {
		const boquet = await db.query('SELECT * FROM boquets ORDER BY arc')
		res.json(boquet.rows)
	}
	async getBoquetsInfo(req, res) {
		const boquet = await db.query('select arc, name_, wrapper_,wrappers.name_type as wrapper_name,boquets.img from boquets inner join wrappers on boquets.wrapper_=wrappers.id_type order by arc')
		res.json(boquet.rows)
	}
	async getOneBoquet(req, res) {
		const arc = req.params.arc
		const boquet = await db.query('SELECT * FROM boquets WHERE arc = ($1)',[arc])
		res.json(boquet.rows[0])
	}
	async deleteBoquet(req, res) {
		const arc = req.params.arc
		const boquet = await db.query('DELETE FROM boquets WHERE arc = ($1)',[arc])
		res.json({ success: true })
	}
}

module.exports = new BoquetController()
