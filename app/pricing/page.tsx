"use client";
import { useState } from "react";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  // Razorpay script load karne ka function
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    const res = await loadRazorpayScript();
    
    if (!res) {
      alert("Payment gateway load nahi ho paya, please try again.");
      setLoading(false);
      return;
    }

    const options = {
      key: "rzp_test_SyfKunUf8KwfSL", // <--- Yahan apni asli Razorpay Key ID dalna
      amount: "19900", // 199 INR (paise mein)
      currency: "INR",
      name: "TubePilot",
      description: "1 Month Subscription",
      handler: function (response: any) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
      },
      theme: { color: "#2563eb" },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <div style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
        <h2 style={{ fontSize: "24px", color: "#111827", marginBottom: "10px" }}>TubePilot Premium</h2>
        <p style={{ color: "#6b7280", marginBottom: "30px" }}>App ko full access karein</p>

        <div style={{ fontSize: "48px", fontWeight: "bold", color: "#1f2937", marginBottom: "20px" }}>
          ₹199<span style={{ fontSize: "18px", color: "#9ca3af", fontWeight: "normal" }}>/mo</span>
        </div>

        <ul style={{ textAlign: "left", color: "#4b5563", marginBottom: "30px", paddingLeft: "20px" }}>
          <li>✅ 1 Month Full Validity</li>
          <li>✅ Account Locked to Your Device</li>
          <li>✅ Share karne par block hoga</li>
        </ul>

        <button
          onClick={handlePayment}
          disabled={loading}
          style={{ width: "100%", backgroundColor: "#2563eb", color: "white", padding: "15px", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          {loading ? "Processing..." : "Buy 1 Month Subscription"}
        </button>
      </div>
    </div>
  );
}

