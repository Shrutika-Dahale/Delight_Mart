import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${API}/transactions`);
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      setError("Failed to load. Is server running?");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/transaction/${id}`, { method: "DELETE" });
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleUndo = async () => {
    try {
      const res = await fetch(`${API}/transaction/last`, { method: "DELETE" });
      if (res.ok) {
        fetchTransactions();
      } else {
        alert("Nothing to undo");
      }
    } catch (err) {
      alert("Undo failed");
    }
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const typeLabel = { sale: "💰 Sale", credit: "📒 Credit", purchase: "🛍️ Purchase" };
  const typeClass = { sale: "badge-sale", credit: "badge-credit", purchase: "badge-purchase" };

  if (loading) return <div className="center-msg">Loading...</div>;
  if (error) return <div className="center-msg error">{error}</div>;

  return (
    <div className="txn-page">
      <div className="txn-header">
        <h2 className="page-title">All Transactions</h2>
        {transactions.length > 0 && (
          <button className="undo-btn" onClick={handleUndo}>
            ↩️ Undo Last
          </button>
        )}
      </div>

      {transactions.length === 0 ? (
        <div className="empty-msg">
          <p>No transactions yet.</p>
          <p>Go add one! ➕</p>
        </div>
      ) : (
        <div className="txn-list">
          {transactions.map((t) => (
            <div className="txn-card" key={t._id}>
              <div className="txn-left">
                <span className={`badge ${typeClass[t.type]}`}>
                  {typeLabel[t.type]}
                </span>
                <span className={`mode-badge ${t.paymentMode}`}>
                  {t.paymentMode === "cash" ? "💵 Cash" : "📲 Online"}
                </span>
                {t.note && <p className="txn-note">📝 {t.note}</p>}
                <p className="txn-time">{formatTime(t.createdAt)}</p>
              </div>
              <div className="txn-right">
                <span className="txn-amount">₹{t.amount}</span>
                <button className="delete-btn" onClick={() => handleDelete(t._id)}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Transactions;