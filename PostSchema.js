'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, default: 'https://static.pexels.com/photos/389818/pexels-photo-389818.jpeg' },
  content: { type: String, required: true },
  type: {type: String, required: true},
  tags: [{ type: String }],
  isDeleted: { type: Boolean, default: false }
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Post', PostSchema)
