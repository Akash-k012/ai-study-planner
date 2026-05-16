const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const auth = require("../middleware/auth");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/", auth, async (req, res) => {
  try {
    const { topic } = req.body;

    const ai = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `Create a 7-day study plan for ${topic} with daily tasks in bullet points.`,
        },
      ],
    });

    res.json(ai.choices[0].message.content);

  } catch (err) {
    console.log(err);
    res.status(500).json("Study planner error");
  }
});

module.exports = router;