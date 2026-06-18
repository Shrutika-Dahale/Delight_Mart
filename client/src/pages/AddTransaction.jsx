import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function AddTransaction() {
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("sale");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const [mode, setMode] = useState("cash");

    const handleSubmit = async () => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            setMsg("❌ Enter a valid amount");
            return;
        }

        setLoading(true);
        setMsg("");

        try {
            const res = await fetch(`${API}/transaction`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: Number(amount), type, note, paymentMode: mode }),
            });

            if (res.ok) {
                setMsg("✅ Saved!");
                setAmount("");
                setNote("");
                setType("sale");
                setMode("cash");
                setTimeout(() => navigate("/"), 800);
            } else {
                setMsg("❌ Failed to save. Try again.");
            }
        } catch (err) {
            setMsg("❌ Server error. Is backend running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-page">
            <h2 className="page-title">Add Transaction</h2>


            <div className="form-group">
                <label className="form-label">Type</label>
                <div className="type-buttons">
                    <button
                        className={`type-btn sale-btn ${type === "sale" ? "active" : ""}`}
                        onClick={() => setType("sale")}
                    >
                        💰 Sale
                    </button>
                    <button
                        className={`type-btn credit-btn ${type === "credit" ? "active" : ""}`}
                        onClick={() => setType("credit")}
                    >
                        📒 Credit
                    </button>
                    <button
                        className={`type-btn purchase-btn ${type === "purchase" ? "active" : ""}`}
                        onClick={() => setType("purchase")}
                    >
                        🛍️ Purchase
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Amount (₹)</label>
                <input
                    className="form-input"
                    type="number"
                    placeholder="e.g. 150"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    autoFocus
                />
            </div>

            <div className="form-group">
                <label className="form-label">Payment Mode</label>
                <div className="type-buttons">
                    <button
                        className={`type-btn ${mode === "cash" ? "active" : ""}`}
                        onClick={() => setMode("cash")}
                    >
                        💵 Cash
                    </button>

                    <button
                        className={`type-btn ${mode === "online" ? "active" : ""}`}
                        onClick={() => setMode("online")}
                    >
                        📲 Online
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Note (optional)</label>
                <input
                    className="form-input"
                    type="text"
                    placeholder="e.g. Ramesh udhaar, sugar stock..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>

            {msg && <div className="form-msg">{msg}</div>}

            <button className="btn-big" onClick={handleSubmit} disabled={loading}>
                {loading ? "Saving..." : "💾 Save Transaction"}
            </button>
        </div>
    );
}

export default AddTransaction;