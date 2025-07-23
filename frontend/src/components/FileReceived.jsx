import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ThemeContext from "../context/ThemeContext";
import { toast, ToastContainer } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function FileReceived() {
  const { state } = useLocation();
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!state?.expiresAt) return;
    const expiryTime = new Date(state.expiresAt).getTime();
    const msUntilExpiry = expiryTime - Date.now();

    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
      setTimeLeft(diff);
    }, 1000);

    const timeout = setTimeout(() => navigate("/"), msUntilExpiry);

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
  function copyFunction() {
   
    var copyText = document.getElementById("myCode");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    toast.success("Code copied sucessfully",{position:"top-right"})
  } 
  
  const handleSendEmail = async () => {
    if (!email) {
      toast.error("Enter valid email!", { position: "top-right" , autoClose: 2000 });
      return;
    }
    try {
      await axios.post(`${API_BASE}/v1/file/send-email`, {
        email,
        fileUrl: state.downloadUrl,
        code: state.uniqueCode,
      });
      toast.success("Email sent sucessfully!", { position: "top-right", autoClose: 2000 });
      setEmail("");
    } catch (error) {
      console.error("Email error:", error);
      toast.success("Email error server problem!", { position: "top-right", autoClose:3000 });
    }
  };
  

  if (!state)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        ❌ No file data found
      </div>
    );
    
  return (
    <div
      className={`min-h-screen px-4 py-10 flex justify-center items-center transition-all duration-300 ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-100 to-white"
          : "bg-gradient-to-br from-[#0f0f0f] to-[#1f1f1f]"
      }`}
    >
       <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`shadow-2xl p-8 rounded-3xl max-w-2xl w-full space-y-6 transition-all ${
          theme === "light"
            ? "bg-white text-gray-800"
            : "bg-[#1a1a1a] text-gray-200 border border-gray-700"
        }`}
      >
        <div className="text-center">
          <div className="text-5xl mb-3">📁</div>
          <h1
            className={`text-3xl font-bold ${
              theme === "light"
                ? "text-gray-800"
                : "bg-gradient-to-r from-pink-400 to-red-500 text-transparent bg-clip-text"
            }`}
          >
            File Received
          </h1>
          <p className={theme === "light" ? "text-gray-500" : "text-gray-400"}>
            Your file is ready to download
          </p>
        </div>

        <div
          className={`text-sm sm:text-base space-y-2 ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          <p>
            <strong>📄 Name:</strong> {state.file?.name || state.name}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3">
  <label htmlFor="myCode" className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
    🔑 Code:
  </label>
  <div className="flex flex-1 gap-2">
    <input
      type="text"
      value={state.uniqueCode}
      id="myCode"
      readOnly
      tabIndex={-1}
      
      style={{ width: `${state.uniqueCode.length + 1}ch` }}
      className="flex-1 px-4 py-2  rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f1f1f] text-gray-800 dark:text-white shadow-sm focus:outline-none pointer-events-none cursor-default"
    />
    <button
      onClick={copyFunction}
      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
    >
      Copy
    </button>
  </div>
</div>

          <p className="break-words">
            <strong>🔗 Link:</strong>{" "}
            <a
              href={state.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline break-all text-blue-400 hover:text-blue-300"
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
              className="w-32 h-32 sm:w-40 sm:h-40 border p-2 bg-white rounded-xl"
            />
          </div>
        )}

        {timeLeft > 0 && (
          <div className="text-center">
            <p className={theme === "light" ? "text-sm text-gray-500" : "text-sm text-gray-400"}>
              ⏱️ Link expires in:
            </p>
            <p className="text-2xl font-mono font-semibold text-red-500 animate-pulse">
              {formatTime(timeLeft)}
            </p>
          </div>
        )}

        <div className="mt-6">
          <h2
            className={`text-lg font-semibold mb-2 ${
              theme === "light" ? "text-gray-700" : "text-gray-200"
            }`}
          >
            📤 Send this file via Email
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter recipient email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`p-2 rounded w-full outline-none border ${
                theme === "light"
                  ? "border-gray-300 focus:ring-2 focus:ring-purple-300"
                  : "border-gray-700 bg-[#2a2a2a] text-white focus:ring-2 focus:ring-pink-400"
              }`}
            />
            <button
              onClick={handleSendEmail}
              className={`px-5 py-2 rounded transition font-semibold ${
                theme === "light"
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white"
              }`}
            >
              Send
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
