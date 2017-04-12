const Router = require('koa-router')
const router = new Router()
const controller = require('./controller')

router.prefix('post')

router.post('/', controller.save)

router.put('/', controller.update)

router.get('/:id', controller.find)

router.delete('/:id/delete', controller.remove)

router.get('/', controller.all)

module.exports = router
