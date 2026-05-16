const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Groq = require("groq-sdk");
const auth = require("../middleware/auth");

const upload = multer();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    console.log("FILE:", req.file); // 👈 ADD THIS

    if (!req.file) {
      return res.status(400).json("No file uploaded");
    }

    const pdfData = await pdfParse(req.file.buffer);

    const text = pdfData.text.slice(0, 5000);

    const ai = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `Summarize this PDF:\n${text}`,
        },
      ],
    });

    res.json(ai.choices[0].message.content);
  } catch (err) {
  console.log("🔥 PDF ERROR FULL:", err);
  res.status(500).json(err.message || "PDF processing error");
}
});

module.exports = router;