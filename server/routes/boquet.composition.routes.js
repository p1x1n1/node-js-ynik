const Router = require('express')
const router = new Router()
const boquetCompositionController = require('../controller/boquet.composition.controller')

router.post('/', boquetCompositionController.createBoquetComposition)
router.get('/', boquetCompositionController.getBoquetCompositions)
router.get('/:id', boquetCompositionController.getOneBoquetComposition)
router.delete('/:id', boquetCompositionController.deleteBoquetComposition)

module.exports = router