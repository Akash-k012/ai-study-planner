const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const studyRoutes = require("./routes/study");
const pdfRoutes = require("./routes/pdf");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.log("Mongo ERROR:", err.message);
  });
// Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/chat", require("./routes/chat"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/study", require("./routes/study"));
app.use("/api/pdf", require("./routes/pdf"));
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
