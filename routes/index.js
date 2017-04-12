'use strict'
const Router = require('koa-router')
const router = new Router()
const blogPost = require('./blog-post')
const routes = [
  blogPost
]

routes.forEach((route) => {
  return router.use(route.routes())
})

module.exports = router
