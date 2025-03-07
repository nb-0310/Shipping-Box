const mongoose = require("mongoose");

const boxSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true, min: 0 },
  color: { type: String, required: true },
  destination: { type: String, required: true },
  cost: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model("Box", boxSchema);
