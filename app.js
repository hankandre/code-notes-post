'use strict'
const Koa = require('koa')
const chalk = require('chalk')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const compress = require('koa-compress')
const router = require('./routes')

const app = new Koa()

// Set up middleware
app.use(logger())
app.use(bodyParser())
app.use(compress())
app.use(router.routes())

// Start API
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(chalk.blue(`Listening on port ${chalk.blue.bold(server.address().port)}`))
})
