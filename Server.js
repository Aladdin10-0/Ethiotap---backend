const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

let userData = {};

app.use(cors());
app.use(bodyParser.json());

// Save user data
app.post('/save', (req, res) => {
  const { telegramId, coins, energy, totalTaps } = req.body;
  if (!telegramId) return res.status(400).send("Missing telegramId");

  userData[telegramId] = { coins, energy, totalTaps };
  res.send({ message: "✅ Data saved!" });
});

// Get user data
app.get('/user/:telegramId', (req, res) => {
  const data = userData[req.params.telegramId];
  if (data) res.send(data);
  else res.status(404).send({ message: "Not found" });
});

// Leaderboard
app.get('/leaderboard', (req, res) => {
  const sorted = Object.entries(userData)
    .sort((a, b) => b[1].totalTaps - a[1].totalTaps)
    .slice(0, 10);
  res.send(sorted);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
