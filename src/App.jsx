
import { useState, useEffect } from "react";
import "./App.css";

function WalletTransaction({ walletHolder, amount }) {
  const [balance, setBalance] = useState(amount);

  useEffect(() => {
    console.log("Digital Wallet System Loaded");
  }, []);

  return (
    <div className="transaction-card">
      <div className="card-header">
        <span className="wallet-icon">₹</span>
        <div>
          <h2>Digital Wallet</h2>
          <p className="subtitle">Transaction Details</p>
        </div>
      </div>

      <div className="balance-section">
        <p className="label">Available Amount</p>
        <h1>₹{balance.toLocaleString("en-IN")}</h1>
        <span className="status">● Wallet Active</span>
      </div>

      <div className="details">
        <div className="detail-row">
          <span>Transaction ID</span>
          <strong>WT02</strong>
        </div>

        <div className="detail-row">
          <span>Wallet Holder</span>
          <strong>{walletHolder}</strong>
        </div>

        <div className="detail-row">
          <span>Transaction Type</span>
          <strong className="credit">Credit</strong>
        </div>

        <div className="detail-row">
          <span>Transaction Amount</span>
          <strong>₹{balance.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      <button
        className="add-button"
        onClick={() => setBalance((prev) => prev + 500)}
      >
        + Add ₹500
      </button>

      <p className="footer-note">
        Secure digital wallet management
      </p>
    </div>
  );
}

export default function App() {
  return (
    <main className="app-container">
      <header className="page-header">
        <p className="eyebrow">WALLET MANAGEMENT SYSTEM</p>
        <h1>Your Money, Your Control.</h1>
        <p className="page-description">
          View your transaction details and manage your wallet balance.
        </p>
      </header>

      <WalletTransaction walletHolder="Priya" amount={3000} />
    </main>
  );
}
