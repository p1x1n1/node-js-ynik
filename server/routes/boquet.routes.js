const Router = require('express')
const router = new Router()
const boquetController = require('../controller/boquet.controller')

router.post('/', boquetController.createBoquet)
router.get('/', boquetController.getBoquets)
router.get('/:arc', boquetController.getOneBoquet)
router.delete('/:arc', boquetController.deleteBoquet)

module.exports = router
