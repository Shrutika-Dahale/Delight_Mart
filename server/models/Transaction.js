const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["sale", "credit", "purchase"],
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
  paymentMode: {
        type: String,
        enum: ["cash", "online"],
        default: "cash"
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);