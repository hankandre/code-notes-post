'use strict'
const Post = require('./PostSchema')
const { send, json} = require('micro')
const querystring = require('querystring')

module.exports = {
  find: find,
  all: all,
  save: save,
  update: update,
  remove: remove
}

async function find ({body}) {
  const id = ctx.params.id
  const doc = await Post.findById(id)
  ctx.body = doc
}

async function all (req, res) {
  req.query = querystring.parse(req.url.substring(2))
  console.log(req.query)
  const take = parseInt(req.query.take)
  const skip = parseInt(req.query.skip)
  console.log(take, skip)

  return {
    posts: await Post.find({isDeleted: false}).skip(skip).limit(take),
    total: await Post.find().count()
  }
}

async function save (ctx) {
  const body = ctx.request.body
  const post = new Post(body)
  const doc = await post.save()
  console.log(doc)
  ctx.body = doc
}

async function update (ctx) {
  const body = ctx.request.body
  const doc = await Post.findByIdAndUpdate(body._id, body, {new: true})
  ctx.body = doc
}

async function remove (ctx) {
  try {
    const id = ctx.params.id
    const doc = await Post.findByIdAndUpdate(id, {isDeleted: true}, {new: true}).exec()
    ctx.body = doc
  } catch (err) {
    ctx.throw(404, err)
  }
}
