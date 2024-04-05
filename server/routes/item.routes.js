const Router = require('express')
const router = new Router()
const itemController = require('../controller/item.controller')

router.post('/', itemController.createItem)
router.get('/', itemController.getItems)
router.get('/:id', itemController.getOneItem)
router.delete('/:id', itemController.deleteItem)

module.exports = router
