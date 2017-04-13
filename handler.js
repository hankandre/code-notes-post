'use strict'
const Post = require('./PostSchema')
const { send } = require('micro')

module.exports = {
  find,
  all,
  save,
  update,
  remove
}

async function find ({params: { id }}) {
  console.log(id)
  const doc = await Post.findById(id)
  return doc
}

async function all ({params: {skip, take}}) {
  return {
    posts: await Post.find({isDeleted: false}).skip(parseInt(skip)).limit(parseInt(take)),
    total: await Post.find().count()
  }
}

async function save ({body}) {
  const post = new Post(body)
  const doc = await post.save()
  return doc
}

async function update ({body}) {
  const doc = await Post.findByIdAndUpdate(body._id, body, {new: true})
  return doc
}

async function remove ({res, params: {id}}) {
  try {
    const doc = await Post.findByIdAndUpdate(id, {isDeleted: true}, {new: true}).exec()
    return doc
  } catch (err) {
    send(res, 404, {error: 'document not found'})
  }
}
