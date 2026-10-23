import { useState, useEffect } from "react";

// Sub-requirement (i): Functional component accepting productName and price as props
export default function Product({ productId, productName, price: initialPrice, category }) {
  // Sub-requirement (ii): useState to maintain the product price
  const [price, setPrice] = useState(initialPrice);
  const [discountApplied, setDiscountApplied] = useState(false);

  // Sub-requirement (iii): useEffect Hook logging on mount
  useEffect(() => {
    console.log("Shopping Cart System Loaded");
  }, []); // Empty array = executes strictly on component mount

  // Sub-requirement (ii): Apply ₹200 discount handler
  function handleApplyDiscount() {
    if (price >= 200) {
      setPrice((prev) => prev - 200);
      setDiscountApplied(true);
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.06)",
        border: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor: "#f1f5f9",
              color: "#475569"
            }}
          >
            {category}
          </span>
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>ID: {productId}</span>
        </div>

        <h3 style={{ margin: "0 0 16px 0", color: "#0f172a", fontSize: "1.2rem" }}>
          {productName}
        </h3>

        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "20px" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0f172a" }}>
            ₹{price}
          </span>
          {discountApplied && (
            <span style={{ fontSize: "13px", color: "#16a34a", fontWeight: "600" }}>
              (₹200 Off Applied)
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleApplyDiscount}
        disabled={price < 200}
        style={{
          backgroundColor: price >= 200 ? "#16a34a" : "#cbd5e1",
          color: "#ffffff",
          border: "none",
          padding: "10px 16px",
          borderRadius: "8px",
          fontWeight: "600",
          fontSize: "14px",
          cursor: price >= 200 ? "pointer" : "not-allowed",
          transition: "background-color 0.2s"
        }}
      >
        {price >= 200 ? "Apply ₹200 Discount" : "Minimum Price Reached"}
      </button>
    </div>
  );
}