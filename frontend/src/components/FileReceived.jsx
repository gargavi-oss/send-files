import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function FileReceived() {
  const { state } = useLocation();
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.expiresAt) return;
    const expiryTime = new Date(state.expiresAt).getTime();
    const now = Date.now();
    const msUntilExpiry = expiryTime - now;

    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
      setTimeLeft(diff);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/");
    }, msUntilExpiry);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [state?.expiresAt, navigate]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleSendEmail = async () => {
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }
    try {
      await axios.post(`${API_BASE}/v1/file/send-email`, {
        email,
        fileUrl: state.downloadUrl,
        code: state.uniqueCode,
      });
      alert("✅ Email sent successfully!");
      setEmail("");
    } catch (error) {
      console.error("Email error:", error);
      alert("❌ Failed to send email.");
    }
  };

  if (!state)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        ❌ No file data found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white px-4 py-10 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-2xl p-8 rounded-3xl max-w-2xl w-full space-y-6"
      >
        <div className="text-center">
          <div className="text-5xl mb-3">📁</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">File Received</h1>
          <p className="text-gray-500">Your file is ready to download</p>
        </div>

        <div className="text-sm sm:text-base space-y-2 text-gray-700">
          <p><strong>📄 Name:</strong> {state.file?.name}{state.name}</p>
          <p><strong>🔑 Code:</strong> {state.uniqueCode}</p>
          <p className="break-words">
            <strong>🔗 Link:</strong>{" "}
            <a
              href={state.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {state.downloadUrl}
            </a>
          </p>
        </div>

        {state.qrCode && (
          <div className="flex justify-center">
            <img
              src={state.qrCode}
              alt="QR Code"
              className="w-32 h-32 sm:w-40 sm:h-40 border p-2 bg-gray-50 rounded-xl"
            />
          </div>
        )}

        {timeLeft > 0 && (
          <div className="text-center">
            <p className="text-sm text-gray-500">⏱️ Link expires in:</p>
            <p className="text-2xl font-mono font-semibold text-red-600 animate-pulse">
              {formatTime(timeLeft)}
            </p>
          </div>
        )}

     
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">📤 Send this file via Email</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter recipient email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button
              onClick={handleSendEmail}
              className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
