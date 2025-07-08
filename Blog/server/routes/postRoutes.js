const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Post = require("../models/Post");

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// GET single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// ✅ POST route to create a new post with image file upload
router.post("/", upload.single("imageFile"), async (req, res) => {
  try {
    const { title, author, affiliation, link, content, tags } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newPost = new Post({
      title,
      author,
      affiliation,
      link,
      content,
      tags: tags ? tags.split(",").map(t => t.trim()) : [],
      imageUrl,
    });

    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving post:", err);
    res.status(500).json({ error: "Server error while saving post" });
  }
});

// PUT route (optional update with image)
router.put("/:id", upload.single("imageFile"), async (req, res) => {
  try {
    const { title, author, affiliation, link, content, tags } = req.body;
    const updatedFields = {
      title,
      author,
      affiliation,
      link,
      content,
      tags: tags ? tags.split(",").map(t => t.trim()) : [],
    };

    if (req.file) {
      updatedFields.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Post.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Failed to update post" });
  }
});

// DELETE route
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

module.exports = router;
