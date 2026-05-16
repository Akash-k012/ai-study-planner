const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({ userId }).catch(() => []);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const result = {};

    days.forEach((d) => (result[d] = 0));

    if (chats && chats.length > 0) {
      chats.forEach((chat) => {
        const day = days[new Date(chat.createdAt).getDay()];
        result[day]++;
      });
    }

    const data = Object.keys(result).map((day) => ({
      day,
      count: result[day],
    }));

    const totalChats = chats.length || 0;

    const mostActive =
      data.length > 0
        ? data.reduce((a, b) => (a.count > b.count ? a : b))
        : null;

    res.json({
      data,
      totalChats,
      mostActiveDay: mostActive ? mostActive.day : "N/A",
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.json({
      data: [],
      totalChats: 0,
      mostActiveDay: "N/A",
    });
  }
});

module.exports = router;
