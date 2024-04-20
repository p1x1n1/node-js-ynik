const Router = require('express')
const router = new Router
const itemRouter = require('./item.routes.js')
const boquetRouter = require('./boquet.routes.js')
const boquetCompositionRouter = require('./boquet.composition.routes.js')
const flowerRouter = require('./flower.routes.js')
const wrapperRouter = require('./wrapper.routes.js')


router.use('/item',itemRouter)
router.use('/flower',flowerRouter)
router.use('/boquet',boquetRouter)
router.use('/boquetcomposition',boquetCompositionRouter)
router.use('/wrapper',wrapperRouter)
//router.use('/auth',authRouter)

module.exports = router