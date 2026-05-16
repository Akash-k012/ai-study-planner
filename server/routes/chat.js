const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const Chat = require("../models/Chat");
const auth = require("../middleware/auth");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/* =======================
   POST: Send message
======================= */
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { message } = req.body;

    const ai = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: message }],
    });

    const reply = ai.choices[0].message.content;

    // ✅ SAVE CHAT
    await Chat.create({
      userId,
      message,
      response: reply,
    });

    res.json(reply);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

/* =======================
   GET: Chat history
======================= */
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({ userId }).sort({ createdAt: -1 });

    res.json(chats || []);
  } catch (err) {
    console.error("Error fetching chats:", err);
    res.json([]);
  }
});

module.exports = router;
