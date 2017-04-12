'use strict'
const Koa = require('koa')
const chalk = require('chalk')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const compress = require('koa-compress')
const router = require('./routes')

const app = new Koa()

app.use(logger())
app.use(bodyParser())
app.use(compress())
app.use(router.routes())

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(chalk.green(`Listening on port ${chalk.green.bold(server.address().port)}`))
})
