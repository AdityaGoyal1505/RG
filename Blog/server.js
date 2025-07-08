const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const postRoutes = require("./server/routes/postRoutes.js");
const authRoutes = require("./server/routes/authRoutes.js");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files correctly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, 'client')));

// Root route serves index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Optionally: catch-all route for SPA (if using React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// API Routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    )
  )
  .catch((err) => console.error(err));
