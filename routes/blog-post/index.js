const Router = require('koa-router')
const router = new Router()
const controller = require('./controller')

router.get('/:id', controller.find)

router.get('/', controller.all)

module.exports = router
