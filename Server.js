const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

let userData = {}; // temporary in-memory storage

app.use(cors());
app.use(express.json());

app.post("/save", (req, res) => {
  const { userId, data } = req.body;
  if (!userId || !data) return res.status(400).json({ message: "Missing userId or data" });
  userData[userId] = data;
  res.json({ message: "✅ Saved!" });
});

app.get("/load/:userId", (req, res) => {
  const userId = req.params.userId;
  const data = userData[userId] || null;
  res.json({ data });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
