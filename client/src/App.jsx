import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <h1>🛒 Delight Store</h1>
          <p className="header-sub">Daily Ledger Tracker</p>
        </header>

        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/add" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            ➕ Add
          </NavLink>
          <NavLink to="/transactions" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            📋 History
          </NavLink>
        </nav>

        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;