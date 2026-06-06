"use client";

import { useEffect, useState } from "react";
<div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
  <div style={{ padding: "10px", border: "1px solid #ddd" }}>
    📌 Total Videos: {videos.length}
  </div>
<div
  style={{
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  }}
>
<div
  style={{
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  }}
>
  <h3>📊 Progress</h3>

  <div
    style={{
      height: "20px",
      background: "#eee",
      borderRadius: "10px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${videos.length
          ? (videos.filter((v) => v.status === "done").length /
              videos.length) *
            100
          : 0}%`,
        height: "100%",
        background: "green",
      }}
    />
  </div>

  <p>
    {videos.length
      ? Math.round(
          (videos.filter((v) => v.status === "done").length /
            videos.length) *
            100
        )
      : 0}
    % Completed
  </p>
</div>
  <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}>
    📌 Total Videos: {videos.length}
  </div>

  <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}>
    ⏳ Pending: {videos.filter((v) => v.status === "pending").length}
  </div>

  <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}>
    ✅ Done: {videos.filter((v) => v.status === "done").length}
  </div>
</div>
  <div style={{ padding: "10px", border: "1px solid #ddd" }}>
    ⏳ Pending: {videos.filter(v => v.status === "pending").length}
  </div>

  <div style={{ padding: "10px", border: "1px solid #ddd" }}>
    ✅ Done: {videos.filter(v => v.status === "done").length}
  </div>
</div>
export default function Dashboard() {
  const [topic, setTopic] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [channelName, setChannelName] = useState("");
  const [uploadTime, setUploadTime] = useState("");
const [videos, setVideos] = useState([]);
useEffect(() => {
  loadVideos();
}, []);

const loadVideos = async () => {
  const res = await fetch("/api/save");
  const data = await res.json();

  if (data.success) {
    setVideos(data.data);
  }
};
const saveVideo = async () => {
  const res = await fetch("/api/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
const formData = new FormData();

formData.append("file", file);
formData.append("topic", topic);
formData.append("videoUrl", videoUrl);
formData.append("channelName", channelName);
formData.append("uploadTime", uploadTime);
formData.append("status", "pending");
  });
const deleteVideo = async (id: number) => {
  const res = await fetch("/api/save", {
    method: "DELETE",
const res = await fetch("/api/save", {
  method: "POST",
  body: formData,
});   
  });

  const data = await res.json();

  if (data.success) {
    setVideos((prev: any) =>
      prev.filter((v: any) => v.id !== id)
    );
  }
};
  alert("Video Saved ✔️");
};
const cardStyle = {
  padding: "15px",
  borderRadius: "10px",
  border: "1px solid #eee",
  background: "white",
  minWidth: "120px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};
  return (
<div style={{ padding: "40px", background: "#f5f6fa", minHeight: "100vh" }}>
<h1 style={{ marginBottom: "20px" }}>
<div
  style={{
    padding: "20px",
    background: "white",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  }}
>
  <h1>🚀 YouTube SaaS Control Panel</h1>
<div
  style={{
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  }}
>
  <div style={cardStyle}>
    📌 Total Videos: {videos.length}
  </div>

  <div style={cardStyle}>
    ⏳ Pending: {videos.filter((v: any) => v.status === "pending").length}
  </div>

  <div style={cardStyle}>
    ✅ Done: {videos.filter((v: any) => v.status === "done").length}
  </div>

  <div style={cardStyle}>
    ❌ Failed: {videos.filter((v: any) => v.status === "failed").length}
  </div>
</div>
style={{
  padding: "12px",
  width: "300px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
}}
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <br /><br />

      <input
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <br /><br />

      <input
        placeholder="Channel Name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <br /><br />

      <input
        placeholder="Upload Time (18:00)"
        value={uploadTime}
        onChange={(e) => setUploadTime(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

<br /><br />

<input
  type="file"
  onChange={(e) => setFile(e.target.files?.[0] || null)}
  style={{
    padding: "10px",
    width: "300px",
  }}
/>
     <button
  onClick={async () => {
    const res = await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
<div
  style={{
    padding: "20px",
    background: "white",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  }}
>
  
  {/* Topic input */}
  {/* Video URL input */}
  {/* Channel Name input */}
  {/* Upload Time input */}

  {/* 💾 Save Button */}
  {/* ⏭️ Next Button */}

</div>
        topic,
        videoUrl,
        channelName,
        uploadTime,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Video saved!");
    }
  }}
>
<button
  style={{
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer",
  }}
>
  💾 Save Video
</button>
  onClick={async () => {
    const res = await fetch("/api/next-video");
    const data = await res.json();

    if (data.success) {
      setTopic(data.video.topic || "");
      setVideoUrl(data.video.videoUrl || "");
      setChannelName(data.video.channelName || "");
      setUploadTime(data.video.uploadTime || "");

      alert("Next video loaded!");
    } else {
      alert("No videos found");
    }
  }}
  style={{ marginLeft: "10px", background: "blue", color: "white" }}
>
<button
  style={{
    marginLeft: "10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
  }}
>
  ⏭️ Next Video
</button>
<hr />
<h2>⏳ Pending Videos</h2>

{videos
  .filter((video: any) => video.status === "pending")
  .map((video: any) => (
<div key={video.id} style={{ marginBottom: "10px" }}>
  {video.topic} - {video.uploadTime}

  <button
    onClick={async () => {
      await fetch("/api/save", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: video.id }),
      });

      alert("Deleted ✔️");
      window.location.reload();
    }}
    style={{
      marginLeft: "10px",
      background: "red",
      color: "white",
      border: "none",
      padding: "3px 8px",
    }}
  >
    🗑 Delete
  </button>
</div>
  ))}
<h2>✅ Completed Videos</h2>
<h2>❌ Failed Videos</h2>

{videos
  .filter((video) => video.status === "failed")
  .map((video) => (
<div
  key={video.id}
  style={{
    padding: "10px",
    marginBottom: "8px",
    border: "1px solid #eee",
    borderRadius: "10px",
    background: "#fafafa",
  }}
>
  {video.topic} - {video.uploadTime}
</div> 
   <div key={video.id} style={{ color: "red" }}>
      {video.topic} - {video.uploadTime}
    </div>
  ))}
{videos
  .filter((video: any) => video.status === "done")
  .map((video: any) => (
<div key={video.id} style={{ marginBottom: "10px" }}>
  {video.topic} - {video.uploadTime}

  <button
    onClick={async () => {
      await fetch("/api/save", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: video.id }),
      });

      alert("Deleted ✔️");
onClick={() => deleteVideo(video.id)}     
    }}
    style={{
      marginLeft: "10px",
      background: "red",
      color: "white",
      border: "none",
      padding: "3px 8px",
    }}
  >
    🗑 Delete
  </button>
</div>
  ))}
</div>
  );
}	
