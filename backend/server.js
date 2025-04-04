// server.js
const express = require("express");
const cors = require("cors");
const { AptosClient } = require("aptos");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const client = new AptosClient(NODE_URL);

// Health check
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// Get account progress (off-chain helper example)
app.get("/progress/:address", async (req, res) => {
  const address = req.params.address;
  try {
    const resource = await client.getAccountResource(
      address,
      `${address}::LearningPath::LearningPath`
    );

    const progress = resource.data.progress;
    const goal = resource.data.goal;

    res.json({ address, progress, goal });
  } catch (err) {
    res.status(404).json({ error: "Learning path not found or not initialized" });
  }
});

// Save tx log (just prints for now)
app.post("/log-tx", (req, res) => {
  const { address, txHash } = req.body;

  console.log(`📦 TX logged from ${address}: ${txHash}`);
  res.json({ status: "logged" });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
