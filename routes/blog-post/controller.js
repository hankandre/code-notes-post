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
  ctx.body = doc
}

async function all (ctx) {
  ctx.body = ctx.query
}

async function save (ctx) {
  const body = ctx.request.body
  const post = new PostModel(body)
  const doc = await post.save()
  ctx.body = doc
}

async function update (ctx) {
  const body = ctx.request.body
  const doc = await PostModel.findByIdAndUpdate(body.id, body)
  ctx.body = doc
}

async function remove (ctx) {
  const id = ctx.request.body._id
  const doc = await PostModel.findByIdAndUpdate(id, {isDeleted: true})
  ctx.body = doc
}
