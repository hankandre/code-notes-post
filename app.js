'use strict'
const handler = require('./handler')
const microApi = require('micro-api')
require('dotenv').config()

const app = microApi([
  {
    method: 'get',
    path: '/:id',
    handler: handler.find
  },
  {
    method: 'get',
    path: '/',
    handler: handler.all
  },
  {
    method: 'post',
    path: '/',
    handler: handler.save
  },
  {
    method: 'put',
    path: '/',
    handler: handler.update
  },
  {
    method: 'delete',
    path: '/:id',
    handler: handler.remove
  }
])

module.exports = app
