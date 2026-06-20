import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [monthlyLoading, setMonthlyLoading] = useState(true);

  const MONTH_NAMES = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  useEffect(() => {
    fetchSummary();
    fetchMonthlySummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await fetch(`${API}/summary`);
      const data = await res.json();
      setSummary(data);
    } catch (err) {
      setError("Failed to load. Is the server running?");
    } finally {
      setLoading(false);
    }
  };
  const fetchMonthlySummary = async () => {
    try {
      const res = await fetch(`${API}/monthly-summary`);
      const data = await res.json();
      setMonthlyData(data);
    } catch (err) {
      console.error("Monthly summary failed:", err);
    } finally {
      setMonthlyLoading(false);
    }
  };

  if (loading) return <div className="center-msg">Loading...</div>;
  if (error) return <div className="center-msg error">{error}</div>;

  return (
    <div className="dashboard">
      <h2 className="page-title">Today's Overview</h2>

      <div className="summary-grid">
        <div className="summary-card sale">
          <div className="card-label">Total Sales</div>
          <div className="card-amount">₹{summary.sale.toFixed(2)}</div>
        </div>

        <div className="summary-card credit">
          <div className="card-label">Credit Given</div>
          <div className="card-amount">₹{summary.credit.toFixed(2)}</div>
        </div>

        <div className="summary-card purchase">
          <div className="card-label">Purchases</div>
          <div className="card-amount">₹{summary.purchase.toFixed(2)}</div>
        </div>

        <div className="summary-card cash">
          <div className="card-label">Est. Cash in Hand</div>
          <div className="card-amount">₹{summary.estimatedCash.toFixed(2)}</div>
        </div>
      </div>
      <button className="btn-big" onClick={() => navigate("/add")}>
        ➕ Add New Transaction
      </button>

      {/* ===== MONTHLY OVERVIEW ===== */}
      <div className="monthly-section">
        <h3 className="monthly-title">📅 Monthly Overview</h3>

        {monthlyLoading ? (
          <div className="center-msg">Loading...</div>
        ) : monthlyData.length === 0 ? (
          <div className="monthly-empty">No transactions found yet.</div>
        ) : (

          <div className="monthly-card">
            <select
              className="month-select"
              value={selectedIndex === null ? "" : selectedIndex}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedIndex(val === "" ? null : Number(val));
              }}
            >
              <option value="">-- Select Month --</option>
              {monthlyData.map((m, i) => (
                <option key={i} value={i}>
                  {MONTH_NAMES[m.month]} {m.year}
                </option>
              ))}
            </select>

            {selectedIndex !== null && monthlyData[selectedIndex] && (

              <div className="monthly-grid">
                <div className="monthly-item income">
                  <div className="monthly-label">Income</div>
                  <div className="monthly-amount">₹{monthlyData[selectedIndex].income.toFixed(2)}</div>
                </div>

                <div className="monthly-item purchases">
                  <div className="monthly-label">Purchases</div>
                  <div className="monthly-amount">₹{monthlyData[selectedIndex].purchase.toFixed(2)}</div>
                </div>

                <div className="monthly-item credit">
                  <div className="monthly-label">Credit Given</div>
                  <div className="monthly-amount">₹{monthlyData[selectedIndex].credit.toFixed(2)}</div>
                </div>

                <div className="monthly-item profit">
                  <div className="monthly-label">Est. Profit</div>
                  <div className="monthly-amount">₹{monthlyData[selectedIndex].profit.toFixed(2)}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="purchase-section">
        <h2 className="purchase-title">
          📅 Monthly Purchase
        </h2>

        <div className="summary-card monthly-purchase">
          <div className="card-label">
            This Month's Purchases
          </div>

          <div className="card-amount">
            ₹{(summary.monthlyPurchase || 0).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;