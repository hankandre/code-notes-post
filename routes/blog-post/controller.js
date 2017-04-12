'use strict'
const PostModel = require('../../models').PostModel

module.exports = {
  find: find,
  all: all,
  save: save,
  update: update,
  remove: remove
}

async function find (ctx) {
  const id = ctx.params.id
  const doc = await PostModel.findById(id)
  ctx.response.body = doc
}

async function all (ctx) {
  const body 
}
