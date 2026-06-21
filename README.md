# 🛒 Delight Store — Daily Ledger Tracker

> A simple digital ledger for small kirana shop owners to track daily transactions. Replaces the traditional paper bahi khata — fast, mobile-friendly, no login required.

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

---

## 🎯 Problem

Small shop owners maintain a physical register to track daily sales, credit (udhaar), and purchases. This app digitalizes that process — simple, fast, and mobile-first.

---

## ✨ Features

- 📊 **Dashboard** — Today's total sales, credit given, purchases and estimated cash in hand
- ➕ **Add Transaction** — Sale, Credit or Purchase with Cash / Online payment mode
- 📅 **Monthly Overview** — Select any month and see income, purchases, credit and estimated profit
- 📅 **Monthly Purchase Card** — Quick view of current month's total purchases
- 📋 **Transaction History** — All transactions with type badge, payment mode and time
- 🗑️ **Delete** — Remove any transaction instantly

---

## 🧱 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React (Vite), Plain CSS |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## 📁 Project Structure

```
Delight_Mart/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AddTransaction.jsx
│   │   │   └── Transactions.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   └── vite.config.js
└── server/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── transactionController.js
    ├── models/
    │   └── Transaction.js
    ├── routes/
    │   └── transactionRoutes.js
    └── server.js
```

---

## 🌐 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/transaction` | Add transaction |
| GET | `/api/transactions` | Get all transactions |
| GET | `/api/summary` | Today's summary |
| GET | `/api/monthly-summary` | Month-wise summary |
| DELETE | `/api/transaction/:id` | Delete by ID |

---

## 🔄 Iteration Story

| Phase | What was added | Decision |
|-------|---------------|----------|
| Phase 1 | Notes field (jugaad notes) | ❌ Removed — not used |
| Phase 1 | Undo last transaction button | ❌ Removed — not used |
| Phase 2 | Simplified UI, faster entry | ✅ Kept |

> "Build → Observe → Simplify. That is the real product cycle."

---

## 🚀 Deployment

| Service | Platform |
|---------|----------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [MongoDB Atlas](https://cloud.mongodb.com) |

---

## 👩‍💻 Author

Built with ❤️ by **Shrutika Dahale**
