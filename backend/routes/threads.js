const express = require("express");
const db = require("../models/database");
const router = express.Router();

// all categories
const requiredCategories = ["news", "gym", "food"];

// Get all threads
router.get("/", (req, res) => {
  let threads = db.prepare("SELECT * FROM threads").all();

  // Controll categories exist
  const foundCategories = threads.map((thread) => thread.category);
  const missingCategories = requiredCategories.filter(
    (cat) => !foundCategories.includes(cat)
  );

  if (missingCategories.length > 0) {
    return res.status(500).json({
      error: "Missing categories in database",
      missing: missingCategories,
    });
  }

  res.json(threads);
});

// Get thread and their message
router.get("/:category", (req, res) => {
  const { category } = req.params;

  const thread = db
    .prepare("SELECT * FROM threads WHERE category = ?")
    .get(category);
  if (!thread) return res.status(404).json({ error: "Thread not found" });

  const messages = db
    .prepare(
      "SELECT username, user_image, text, created_at FROM messages WHERE thread_id = ? ORDER BY created_at ASC"
    )
    .all(thread.id);

  res.json({ thread, messages });
});

// Create new thread
router.post("/", (req, res) => {
  const { category, headline } = req.body;
  if (!category || !headline)
    return res.status(400).json({ error: "Missing fields" });

  const result = db
    .prepare("INSERT INTO threads (category, headline) VALUES (?, ?)")
    .run(category, headline);
  res.json({ id: result.lastInsertRowid, category, headline });
});

// Integrate message and thread
router.post("/:id/messages", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Message text required" });

  try {
    const result = db
      .prepare(
        "INSERT INTO messages (thread_id, username, user_image, text) VALUES (?, ?, ?, ?)"
      )
      .run(id, "User", "/img/user-image.png", text);

    res.json({
      id: result.lastInsertRowid,
      thread_id: id,
      username: "User",
      user_image: "/img/user-image.png",
      text,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete message
router.delete("/messages/:id", (req, res) => {
  const { id } = req.params;

  const deleteMessage = db.prepare("DELETE FROM messages WHERE id = ?");
  const result = deleteMessage.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Message not found" });
  }

  res.json({ message: "Message deleted successfully", id });
});

module.exports = router;
