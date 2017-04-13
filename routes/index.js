'use strict'
const Router = require('koa-router')
const router = new Router()
const post = require('./post')
const routes = [
  post
]

routes.forEach((route) => {
  return router.use(route.routes())
})

module.exports = router
