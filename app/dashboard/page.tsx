"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [topic, setTopic] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [channelName, setChannelName] = useState("");
  const [uploadTime, setUploadTime] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    loadVideos();
  }, []);

  // 1. Load All Videos
  const loadVideos = async () => {
    try {
      const res = await fetch("/api/save");
      const data = await res.json();
      if (data.success) {
        setVideos(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load videos", err);
    }
  };

  // 2. Save/Upload Video Handler
  const handleSaveVideo = async () => {
    if (!topic || !videoUrl || !channelName || !uploadTime) {
      alert("Please fill all text fields");
      return;
    }

    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("topic", topic);
      formData.append("videoUrl", videoUrl);
      formData.append("channelName", channelName);
      formData.append("uploadTime", uploadTime);
      formData.append("status", "pending");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData, // FormData ke saath explicit Content-Type header nahi lagaya jata
      });

      const data = await res.json();
      if (data.success) {
        alert("Video Saved ✔️");
        // Form Reset
        setTopic("");
        setVideoUrl("");
        setChannelName("");
        setUploadTime("");
        setFile(null);
        loadVideos(); // UI refresh karne ke liye
      } else {
        alert("Upload failed!");
      }
    } catch (err) {
      console.error("Error saving video", err);
    }
  };

  // 3. Load Next Video Handler
  const handleNextVideo = async () => {
    try {
      const res = await fetch("/api/next-video");
      const data = await res.json();

      if (data.success && data.video) {
        setTopic(data.video.topic || "");
        setVideoUrl(data.video.videoUrl || "");
        setChannelName(data.video.channelName || "");
        setUploadTime(data.video.uploadTime || "");
        alert("Next video loaded!");
      } else {
        alert("No videos found");
      }
    } catch (err) {
      console.error("Error loading next video", err);
    }
  };

  // 4. Delete Video Handler
  const handleDeleteVideo = async (id: number) => {
    if (!confirm("Are you sure you want to delete?")) return;

    try {
      const res = await fetch("/api/save", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Deleted ✔️");
        setVideos((prev) => prev.filter((v) => v.id !== id));
      }
    } catch (err) {
      console.error("Error deleting video", err);
    }
  };

  const cardStyle = {
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #eee",
    background: "white",
    minWidth: "120px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  };

  const inputStyle = {
    padding: "12px",
    width: "100%",
    maxWidth: "300px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    display: "block",
  };

  // Progress Calculations
  const totalCount = videos.length;
  const doneCount = videos.filter((v) => v.status === "done").length;
  const pendingCount = videos.filter((v) => v.status === "pending").length;
  const failedCount = videos.filter((v) => v.status === "failed").length;
  const progressPercent = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div style={{ padding: "40px", background: "#f5f6fa", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
      {/* Top Controls Card */}
      <div style={{ padding: "20px", background: "white", borderRadius: "12px", marginBottom: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
<Image
  src="/logo.png"
  alt="TubePilot Logo"
  width={100}
  height={100}
/>   
 <h1>🚀 TubePilot Control Panel</h1> 
     <p>Automate. Upload. Grow.</p>
   
        {/* Stats Cards Row */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          <div style={cardStyle}>📌 Total Videos: {totalCount}</div>
          <div style={cardStyle}>⏳ Pending: {pendingCount}</div>
          <div style={cardStyle}>✅ Done: {doneCount}</div>
          <div style={cardStyle}>❌ Failed: {failedCount}</div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", maxWidth: "400px" }}>
          <h3>📊 Progress</h3>
          <div style={{ height: "20px", background: "#eee", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ width: `${progressPercent}%`, height: "100%", background: "green", transition: "width 0.3s" }} />
          </div>
          <p>{progressPercent}% Completed</p>
        </div>
      </div>

      {/* Form Input Section Card */}
      <div style={{ padding: "20px", background: "white", borderRadius: "12px", marginBottom: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <h3>Add / Manage Video</h3>
        
        <input
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Upload Time (e.g., 18:00)"
          value={uploadTime}
          onChange={(e) => setUploadTime(e.target.value)}
          style={inputStyle}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={inputStyle}
        />

        <div style={{ marginTop: "10px" }}>
          <button
            onClick={handleSaveVideo}
            style={{ padding: "10px 15px", border: "none", borderRadius: "8px", background: "#4CAF50", color: "white", cursor: "pointer", fontWeight: "bold" }}
          >
            💾 Save Video
          </button>

          <button
            onClick={handleNextVideo}
            style={{ marginLeft: "10px", padding: "10px 15px", border: "none", borderRadius: "8px", background: "#007bff", color: "white", cursor: "pointer", fontWeight: "bold" }}
          >
            ⏭️ Next Video
          </button>
        </div>
      </div>

      {/* Video Lists Sections */}
      <div style={{ padding: "20px", background: "white", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        
        {/* Pending Section */}
        <h2>⏳ Pending Videos</h2>
        {videos.filter((video) => video.status === "pending").length === 0 ? <p style={{ color: "#777" }}>No pending videos.</p> : null}
        {videos
          .filter((video) => video.status === "pending")
          .map((video) => (
            <div key={video.id} style={{ marginBottom: "10px", padding: "10px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center" }}>
              <span>{video.topic} - {video.uploadTime}</span>
              <button
                onClick={() => handleDeleteVideo(video.id)}
                style={{ marginLeft: "auto", background: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
              >
                🗑 Delete
              </button>
            </div>
          ))}

        <hr style={{ margin: "20px 0", border: "0", borderTop: "1px solid #eee" }} />

        {/* Completed Section */}
        <h2>✅ Completed Videos</h2>
        {videos.filter((video) => video.status === "done").length === 0 ? <p style={{ color: "#777" }}>No completed videos yet.</p> : null}
        {videos
          .filter((video) => video.status === "done")
          .map((video) => (
            <div key={video.id} style={{ marginBottom: "10px", padding: "10px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center" }}>
              <span>{video.topic} - {video.uploadTime}</span>
              <button
                onClick={() => handleDeleteVideo(video.id)}
                style={{ marginLeft: "auto", background: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
              >
                🗑 Delete
              </button>
            </div>
          ))}

        <hr style={{ margin: "20px 0", border: "0", borderTop: "1px solid #eee" }} />

        {/* Failed Section */}
        <h2>❌ Failed Videos</h2>
        {videos.filter((video) => video.status === "failed").length === 0 ? <p style={{ color: "#777" }}>No failed videos.</p> : null}
        {videos
          .filter((video) => video.status === "failed")
          .map((video) => (
            <div key={video.id} style={{ padding: "10px", marginBottom: "8px", border: "1px solid #ffd6d6", borderRadius: "10px", background: "#fff5f5", color: "red" }}>
              {video.topic} - {video.uploadTime}
            </div>
          ))}
      </div>

    </div>
  );
}

