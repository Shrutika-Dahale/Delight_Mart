const Transaction = require("../models/Transaction");

// POST /api/transaction
const addTransaction = async (req, res) => {
  try {
    const { amount, type, note, paymentMode } = req.body;

    if (
      amount === undefined ||
      amount === null ||
      isNaN(amount) ||
      Number(amount) <= 0 ||
      !type
    ) {
      return res.status(400).json({ error: "Invalid amount or type" });
    }
    const transaction = new Transaction({ amount, type, note, paymentMode, });
    await transaction.save();

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/summary
const getSummary = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const result = await Transaction.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lt: endOfDay },
        },
      },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const summary = { sale: 0, credit: 0, purchase: 0, monthlyPurchase: 0 };

    result.forEach((item) => {
      summary[item._id] = item.total;
    });

    summary.estimatedCash = summary.sale - summary.purchase;

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthlyPurchase = await Transaction.aggregate([
      {
        $match: {
          type: "purchase",
          createdAt: { $gte: startOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    summary.monthlyPurchase = monthlyPurchase.length > 0 ? monthlyPurchase[0].total : 0;

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/transaction/:id
const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Transaction not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/monthly-summary
const getMonthlySummary = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month",
          },
          types: {
            $push: {
              type: "$_id.type",
              total: "$total",
            },
          },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 },
      },
    ]);

    const formatted = result.map((item) => {
      const income = item.types.find((t) => t.type === "sale")?.total || 0;
      const purchase = item.types.find((t) => t.type === "purchase")?.total || 0;
      const credit = item.types.find((t) => t.type === "credit")?.total || 0;

      return {
        month: item._id.month,
        year: item._id.year,
        income,
        purchase,
        credit,
        profit: income - purchase,
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  getSummary,
  getMonthlySummary,
  deleteTransaction,
};