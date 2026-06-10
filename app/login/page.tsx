"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Login Page 🔐</h1>

      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
