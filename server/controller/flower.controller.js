const db = require('../db')

class FlowerController {
	async createFlower(req, res) {
		const { id_type, name_type, img } = req.body
		let flower
		if (id_type) {
			flower = await db.query('UPDATE flowers set name_type = ($1), img = ($2) where id_type = ($3) RETURNING *', [name_type, img,id_type])
		} else {
			flower = await db.query('INSERT INTO flowers (name_type, img) values ($1, $2) RETURNING *', [name_type, img])
		}
		res.json(flower.rows[0])
	}
	async getFlowers(req, res) {
		const flower = await db.query('SELECT * FROM flowers ORDER BY id_type')
		res.json(flower.rows)
	}
	async getOneFlower(req, res) {
		const id_type = req.params.id_type
		const flower = await db.query('SELECT * FROM flowers WHERE id_type = ($1)',[id_type])
		//console.log(id_type+'flower')
		res.json(flower.rows[0])
	}
	async deleteFlower(req, res) {
		const id_type = req.params.id_type
		const flower = await db.query('DELETE FROM flowers WHERE id_type = ($1)',[id_type])
		res.json({ success: true })
	}
}

module.exports = new FlowerController()
