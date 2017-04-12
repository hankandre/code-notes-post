'use strict'
const Router = require('koa-router')
const router = new Router()
const routes = []

routes.forEach((route) => {
  return router.use(route.routes())
})

module.exports = router
