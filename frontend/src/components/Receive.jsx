import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const Receive = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const checkCode = async () => {
    try {
        const response = await axios.post(`${API_BASE}/v1/file/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
    

      const { uniqueCode } = response.data.data;

      if (uniqueCode === code) {
        setTimeout(() => {
          navigate("/fileReceived");
          window.location.reload(true);
        }, 2000);
      } else {
        alert("❌ Invalid code. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Enter code again. Please try again.");
    }
  };

  return (
    <div
      id="receive"
      className="flex flex-col items-center justify-center min-h-screen py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-l from-white to-blue-100"
    >
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
          className="px-6 py-3 text-lg font-semibold bg-white border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white rounded-xl transition duration-300 shadow-md hover:shadow-blue-300"
        >
          🗂️ Receive
        </button>
      </motion.div>

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
