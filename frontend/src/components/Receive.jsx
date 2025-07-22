import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_BASE;

const Receive = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const checkCode = async () => {
    setLoading(true);
    setErrorMsg("");
    if (!code.trim()) {
        toast.warning("Please enter a code before proceeding.", { position: "top-right" });
        return;
      }
      
    try {
      const response = await axios.post(
        `${API_BASE}/v1/file/check`,
        { code },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Code Matches",{position: "top-right"})
  
      console.log("Backend Response:", response.data);
  
      const { file, downloadUrl, uniqueCode, qrCode, expiresAt,name } = response.data.data;
  
      if (uniqueCode === code) {
        navigate("/fileReceived", {
          state: { file, downloadUrl, uniqueCode, qrCode, expiresAt,name },
        });
        
      } else {
        toast.error("Invalid code. Please try again.", { position: "top-right" });

        setErrorMsg("❌ Invalid code. Please try again.");
      }
    } catch (err) {
      console.error("Error checking code:", err?.response?.data || err.message);
      setErrorMsg("❌ Enter a valid code.");
      toast.error("❌ Enter valid code.", { position: "top-right" });

    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div
      id="receive"
      className="flex pb-5 flex-col items-center justify-center min-h-screen pt-14 px-4 sm:px-6 md:px-8 bg-gradient-to-l from-white to-blue-200"
    >
        <ToastContainer
  position="top-right"
  autoClose={4000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  pauseOnHover
  theme="light"
/>

      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-center text-gray-700 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Receive Files Securely
      </motion.h2>

      <motion.p
        className="text-gray-600 text-center max-w-xl mb-8 text-base sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Enter the unique code shared with you to access files. Or share your
        personal receive link.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <input
          type="text"
          placeholder="Enter your code"
          className="w-full px-5 py-3 text-lg border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={checkCode}
          disabled={loading || !code.trim()}
          className={`px-6 py-3 text-lg font-semibold border-2 rounded-xl transition duration-300 shadow-md
            ${
              loading
                ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                : "bg-white border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white hover:shadow-blue-300"
            }
          `}
        >
          {loading ? "🔍 Checking..." : "🗂️ Receive"}
        </button>
      </motion.div>

      {errorMsg && (
        <motion.p
          className="mt-4 text-red-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {errorMsg}
        </motion.p>
      )}

      <p className="mt-6 text-sm text-gray-500">
        💡 Don’t have a code?{" "}
        <HashLink
          to="#send"
          smooth
          className="text-blue-600 font-medium hover:underline"
        >
          Request files from someone
        </HashLink>
      </p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
      >
        {[
          {
            icon: "🔐",
            title: "Secure Transfer",
            desc: "Files are encrypted during transfer & storage.",
          },
          {
            icon: "⚡️",
            title: "Instant Notification",
            desc: "Get notified instantly when your files arrive.",
          },
          {
            icon: "📱",
            title: "Access Anywhere",
            desc: "View your files on any device, anytime.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl mb-2">{feature.icon}</div>
            <h4 className="text-lg font-semibold text-gray-800">
              {feature.title}
            </h4>
            <p className="text-gray-500 text-sm mt-1">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Receive;