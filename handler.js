'use strict'
const Post = require('./PostSchema')
const { send } = require('micro')
const { verify } = require('./jwt')

module.exports = {
  find,
  all,
  save,
  update,
  remove
}

function parseHeader (authorization) {
  return authorization.split(' ').pop()
}

async function find ({res, params: { id }}) {
  // TODO: Implement find by slug http://tinyurl.com/n3havlm
  try {
    const doc = await Post.findById(id)
    return doc
  } catch (err) {
    send(res, 404, { error: err })
  }
}

async function all ({res, params: {skip, take}}) {
  try {
    return {
      posts: await Post.find({isDeleted: false}).skip(parseInt(skip)).limit(parseInt(take)),
      total: await Post.find({isDeleted: false}).count()
    }
  } catch (err) {
    send(res, 404, { error: err })
  }
}

async function save ({res, body, req: {headers: {authorization}}}) {
  console.log(body)
  if (!authorization || !authorization.includes('Bearer')) {
    return send(res, 400, { error: 'Authorization header not present or malformed.' })
  }
  try {
    const token = parseHeader(authorization)
    await verify(token, process.env.JWT_SECRET)
    const post = new Post(body)
    const doc = await post.save()
    return doc
  } catch (err) {
    return send(res, 400, {error: err})
  }
}

async function update ({res, body, req: {headers: {authorization}}}) {
  if (!authorization || !authorization.includes('Bearer')) {
    send(res, 400, { error: 'Authorization header not present or malformed.' })
  }
  try {
    const token = parseHeader(authorization)
    await verify(token, process.env.JWT_SECRET)
    const doc = await Post.findByIdAndUpdate(body._id, body, {new: true})
    return doc
  } catch (err) {
    send(res, 404, { error: err })
  }
}

async function remove ({res, params: {id}, req: {headers: {authorization}}}) {
  if (!authorization || !authorization.includes('Bearer')) {
    send(res, 400, { error: 'Authorization header not present or malformed.' })
  }
  try {
    const token = parseHeader(authorization)
    await verify(token, process.env.JWT_SECRET)
    const doc = await Post.findByIdAndUpdate(id, {isDeleted: true}, {new: true}).exec()
    return doc
  } catch (err) {
    send(res, 404, {error: err})
  }
}
