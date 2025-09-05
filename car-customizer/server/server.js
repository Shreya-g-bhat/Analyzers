const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Example API endpoint for pricing or rules
app.post('/price', (req, res) => {
  const options = req.body;
  // simple calculation (replace with real logic)
  const price = 30000 + (options.spoiler ? 500 : 0);
  res.json({ price });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
