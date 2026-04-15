import { useState } from "react";
import axios from "axios";

export default function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post("http://127.0.0.1:8000/summarize", { url });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "60px auto", fontFamily: "sans-serif", padding: "0 20px" }}>
      <h1>YouTube Summarizer</h1>
      <p>Paste a YouTube URL and get a summary + key takeaways</p>

      <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
        <input
          type="text"
          placeholder="https://www.youtube.com/watch?v=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1, padding: "10px", fontSize: 14, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button
          onClick={handleSummarize}
          disabled={loading}
          style={{ padding: "10px 20px", background: "#e00", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 14 }}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </div>

      {error && <p style={{ color: "red", marginTop: 16 }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 32 }}>
          <h2>Summary</h2>
          <p>{result.summary}</p>

          <h2>Key Takeaways</h2>
          <ul>
            {result.key_takeaways.map((point, i) => (
              <li key={i} style={{ marginBottom: 8 }}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}