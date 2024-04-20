const Router = require('express')
const router = new Router()
const boquetCompositionController = require('../controller/boquet.composition.controller')

router.post('/', boquetCompositionController.createBoquetComposition)
router.get('/', boquetCompositionController.getBoquetCompositions)
router.get('/:arc_boquets', boquetCompositionController.getOneBoquetComposition)
router.get('/:arc_boquets/:id_type_flowers', boquetCompositionController.getOneBoquetComposition)
router.delete('/:arc_boquets', boquetCompositionController.deleteBoquetComposition)
router.delete('/:arc_boquets/:id_type_flowers', boquetCompositionController.deleteBoquetFlowerComposition)

module.exports = router