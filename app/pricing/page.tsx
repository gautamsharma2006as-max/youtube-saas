"use client";
import { useState } from "react";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

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
      alert("Razorpay SDK load nahi hua.");
      setLoading(false);
      return;
    }

    const options = {
      key: "rzp_test_SyfKunUf8KwfSL", // <--- Yahan apni asli Key ID likhein
      amount: "19900",
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
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>TubePilot Premium Plan</h2>
      <p>₹199 / 1 Month</p>
      <button onClick={handlePayment} disabled={loading} style={{ padding: "15px", backgroundColor: "#2563eb", color: "white" }}>
        {loading ? "Processing..." : "Buy 1 Month Subscription"}
      </button>
    </div>
  );
}

