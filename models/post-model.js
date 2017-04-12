'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Post = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }]
},
  {
    timestamps: true
  })

const model = mongoose.model('Post', Post)

module.exports = model
