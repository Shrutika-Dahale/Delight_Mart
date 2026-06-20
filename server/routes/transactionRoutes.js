const express = require("express");
const router = express.Router();

const {
  addTransaction,
  getTransactions,
  getSummary,
  deleteTransaction,
  getMonthlySummary,
} = require("../controllers/transactionController");



router.post("/transaction", addTransaction);
router.get("/transactions", getTransactions);
router.get("/summary", getSummary);
router.get("/monthly-summary", getMonthlySummary);
router.delete("/transaction/:id", deleteTransaction);

module.exports = router;