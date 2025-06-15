const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  const saved = await newPost.save();
  res.json(saved);
});

router.put("/:id", async (req, res) => {
  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});



module.exports = router;
