const Router = require('express')
const router = new Router()
const flowerController = require('../controller/flower.controller')

router.post('/', flowerController.createFlower)
router.get('/', flowerController.getFlowers)
router.get('/:id_type', flowerController.getOneFlower)
router.delete('/:id_type', flowerController.deleteFlower)

module.exports = router
