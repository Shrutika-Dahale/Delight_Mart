const express = require("express");
const router = express.Router();

const {
  addTransaction,
  getTransactions,
  getSummary,
  deleteTransaction,
  deleteLastTransaction,
  getMonthlySummary,
} = require("../controllers/transactionController");

// IMPORTANT: /last must be before /:id
router.delete("/transaction/last", deleteLastTransaction);

router.post("/transaction", addTransaction);
router.get("/transactions", getTransactions);
router.get("/summary", getSummary);
router.get("/monthly-summary", getMonthlySummary);
router.delete("/transaction/:id", deleteTransaction);

module.exports = router;