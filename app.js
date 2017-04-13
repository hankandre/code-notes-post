'use strict'
const chalk = require('chalk')
const handler = require('./handler')
const micro = require('micro')
const microApi = require('micro-api')

const app = micro(async (req, res) => {
  microApi([
    {
      method: 'get',
      path: '/',
      handler: handler.all(req, res)
    },
    {
      method: 'get',
      path: '/:id',
      handler: handler.find(req, res)
    },
    {
      method: 'post',
      path: '/',
      handler: handler.save(req, res)
    },
    {
      method: 'put',
      path: '/',
      handler: handler.update(req, res)
    },
    {
      method: 'delete',
      path: '/:id',
      handler: handler.remove(req, res)
    }
  ])
})

app.listen(3000)
