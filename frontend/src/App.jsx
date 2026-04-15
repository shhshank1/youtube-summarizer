import { useState } from "react";
import axios from "axios";

export default function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    const text = `SUMMARY:\n${result.summary}\n\nKEY TAKEAWAYS:\n${result.key_takeaways.map((t, i) => `${i + 1}. ${t}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 py-16">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">YouTube Summarizer</h1>
        <p className="text-gray-400">Paste a YouTube URL and get an instant AI summary</p>
      </div>

      {/* Input */}
      <div className="w-full max-w-2xl flex gap-3">
        <input
          type="text"
          placeholder="https://www.youtube.com/watch?v=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSummarize()}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-500 transition"
        />
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold text-sm transition"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 text-red-400 text-sm">{error}</p>
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gray-700 border-t-red-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Fetching transcript and summarizing...</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-10 w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Summary</h2>
            <button
              onClick={handleCopy}
              className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">{result.summary}</p>

          <h2 className="text-lg font-semibold text-white mb-3">Key Takeaways</h2>
          <ul className="space-y-2">
            {result.key_takeaways.map((point, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-300">
                <span className="text-red-500 font-bold">{i + 1}.</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}