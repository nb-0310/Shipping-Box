require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Box = require("./models/box");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Route to add a new box
app.post("/api/boxes", async (req, res) => {
  try {
    const { name, weight, color, destination, cost } = req.body;
    const newBox = new Box({ name, weight, color, destination, cost });
    await newBox.save();
    res.status(201).json(newBox);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all boxes
app.get("/api/boxes", async (req, res) => {
  try {
    const boxes = await Box.find();
    res.json(boxes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
