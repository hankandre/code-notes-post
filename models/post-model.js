'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  isDeleted: { type: Boolean, default: false }
},
  {
    timestamps: true
  })

const model = mongoose.model('Post', PostSchema)

module.exports = model
