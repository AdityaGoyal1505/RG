const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  affiliation: String,
  link: String,
  content: String,
  tags: [String],
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
},{timestamps: true});

module.exports = mongoose.model("Post", postSchema);
