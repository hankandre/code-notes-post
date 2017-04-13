const Router = require('koa-router')
const router = new Router()
const controller = require('./controller')

router.prefix('post')

router.post('/', async (ctx, next) => { console.log(ctx.method); await next() }, controller.save)

router.put('/', async (ctx, next) => { console.log(ctx.method); await next() }, controller.update)

router.get('/:id', async (ctx, next) => { console.log(ctx.method); await next() }, controller.find)

router.delete('/:id/delete', async (ctx, next) => { console.log(ctx.method); await next() }, controller.remove)

router.get('/', controller.all)

module.exports = router
