const express = require("express");
const db = require("../models/database");
const router = express.Router();

const defaultUsernames = {
  news: ["Alice", "Ava", "Charlie"],
  gym: ["Sabrina", "Eve", "Julia"],
  food: ["Grace", "Jenna", "Ivy"],
};

const requiredCategories = ["news", "gym", "food"];

router.get("/", (req, res) => {
  let threads = db.prepare("SELECT * FROM threads").all();

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

router.get("/:identifier", (req, res) => {
  const { identifier } = req.params;
  let thread;

  if (!isNaN(identifier)) {
    thread = db.prepare("SELECT * FROM threads WHERE id = ?").get(identifier);
  } else {
    thread = db
      .prepare("SELECT * FROM threads WHERE category = ?")
      .get(identifier);
  }
  if (!thread) return res.status(404).json({ error: "Thread not found" });

  let messages = db
    .prepare(
      "SELECT id, username, user_image, text, created_at FROM messages WHERE thread_id = ? ORDER BY created_at ASC"
    )
    .all(thread.id);

  if (defaultUsernames[thread.category]) {
    const seen = {};
    messages = messages.filter((msg) => {
      if (defaultUsernames[thread.category].includes(msg.username)) {
        if (seen[msg.username]) {
          return false;
        } else {
          seen[msg.username] = true;
          return true;
        }
      }
      return true;
    });
  }
  res.json({ thread, messages });
});

router.post("/", (req, res) => {
  console.log("Request body:", req.body);

  const { category, headline, image_url, text1, text2, text3 } = req.body;

  if (!category || !headline || !text1) {
    return res
      .status(400)
      .json({ error: "Category, headline, and at least text1 are required" });
  }

  const image = image_url || "/img/default-thread.png";

  try {
    const safeText2 = text2 && text2.trim() !== "" ? text2 : "";
    const safeText3 = text3 && text3.trim() !== "" ? text3 : "";
    const stmt = db.prepare(
      "INSERT INTO threads (category, headline, image_url, text1, text2, text3) VALUES (?, ?, ?, ?, ?, ?)"
    );

    const result = stmt.run(
      category,
      headline,
      image,
      text1,
      safeText2,
      safeText3
    );

    res.status(201).json({
      message: "Thread created successfully",
      id: result.lastInsertRowid,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

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

router.delete("/messages/:id", (req, res) => {
  const { id } = req.params;

  const deleteMessage = db.prepare("DELETE FROM messages WHERE id = ?");
  const result = deleteMessage.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Message not found" });
  }
  res.json({ message: "Message deleted successfully", id });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.prepare("DELETE FROM messages WHERE thread_id = ?").run(id);

  const result = db.prepare("DELETE FROM threads WHERE id = ?").run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Thread not found" });
  }

  res.json({ message: "Thread deleted successfully", id });
});

module.exports = router;
