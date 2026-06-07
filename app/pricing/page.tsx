"use client";
import { useState } from "react";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    // Yahan Razorpay ka integration aayega
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <div style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <h2 style={{ fontSize: "24px", color: "#111827", marginBottom: "10px" }}>TubePilot Premium Plan 🚀</h2>
        <p style={{ color: "#6b7280", marginBottom: "30px" }}>App ko full access karne ke liye subscribe karein.</p>

        <div style={{ fontSize: "48px", fontWeight: "bold", color: "#1f2937", marginBottom: "20px" }}>
          ₹199<span style={{ fontSize: "18px", color: "#9ca3af", fontWeight: "normal" }}>/month</span>
        </div>

        <ul style={{ textAlign: "left", color: "#4b5563", marginBottom: "30px", paddingLeft: "20px" }}>
          <li>✅ 1 Month Full Validity</li>
          <li>✅ Account Locked to Your Device</li>
          <li>✅ Share karne par dusre se bhi payment mangega</li>
        </ul>

        <button
          onClick={handlePayment}
          disabled={loading}
          style={{ width: "100%", backgroundColor: "#2563eb", color: "white", padding: "12px", borderRadius: "8px", border: "none", cursor: "pointer" }}
        >
          {loading ? "Processing..." : "Buy 1 Month Subscription"}
        </button>
      </div>
    </div>
  );
}

