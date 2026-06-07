"use client";

import { useState } from "react";

export default function Dashboard() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    if (!topic) return alert("Enter topic");

    setResult(
      `🔥 YouTube Idea: "${topic}" par 5 viral video ideas:
1. Top 10 ${topic}
2. ${topic} secrets revealed
3. Beginner guide for ${topic}`
    );
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🚀 YouTube AI Tool</h1>

      <input
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ padding: "10px", marginTop: "20px" }}
      />

      <br />

      <button onClick={generate} style={{ marginTop: "20px" }}>
        Generate Ideas
      </button>

      <div style={{ marginTop: "30px", whiteSpace: "pre-line" }}>
        {result}
      </div>
    </div>
  );
}
