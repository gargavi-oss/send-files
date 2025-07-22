import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE;

const Send = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return alert("No file dropped!");

    setFile(droppedFile);
    setFileName(droppedFile.name);
    await uploadFile(droppedFile);
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setFileName(selectedFile.name);
    await uploadFile(selectedFile);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    setFileUpload(true);

    try {
      const response = await axios.post(`${API_BASE}/v1/file/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { file, downloadUrl, uniqueCode, expiresAt, qrCode } = response.data.data;

      console.log("Upload success:", response.data);
      setTimeout(() => {
        navigate('/fileReceived',{
          state: {file,downloadUrl,uniqueCode,qrCode,expiresAt}
        });
        window.location.reload(true);
      }, 2000);
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Upload failed. Try again.");
    } finally {
      setFileUpload(false);
    }
  };

  return (
    <div
      id="send"
      className="flex flex-col items-center justify-center h-auto px-4 sm:px-6 md:px-8 bg-gradient-to-l from-white to-blue-200 pt-24"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold text-gray-700 mb-10 text-center max-w-3xl"
      >
        Drag and drop your files <br />
        <span className="text-blue-600">or click to browse</span>
      </motion.h2>

      <motion.div
        animate={{ scale: isDragging ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
       
        
        whileHover={{ scale: 1.02 }}
        className={`mt-6 border-4 border-dashed rounded-xl p-10 w-full max-w-2xl text-center cursor-pointer shadow-xl transition-all duration-300 ${
          isDragging
            ? "border-blue-500 bg-blue-100/50"
            : "border-gray-400 bg-white/70 backdrop-blur-md"
        }`}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {fileUpload ? (
          <>
            <div className="text-xl text-blue-700 font-medium animate-pulse">Uploading...</div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
              className="h-1 bg-blue-500 rounded-full mt-4"
            />
          </>
        ) : file ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-md font-semibold text-green-700"
          >
            ✅ {fileName} uploaded!
          </motion.div>
        ) : (
          <>
            <div className="text-5xl mb-3">📂</div>
            <div className="text-xl font-medium text-gray-700">Drop files here</div>
            <div className="text-sm text-gray-500 mt-1">or click to browse from your device</div>
            <p className="text-sm text-gray-400 mt-4 animate-pulse">
              Tip: You can drop ZIPs, images, or documents of up to 15MB.
            </p>
          </>
        )}

        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {[
            { icon: "📄", label: "Documents" },
            { icon: "🎆", label: "Images" },
            { icon: "📹", label: "Videos" },
            { icon: "📦", label: "Archives" },
          ].map((fileType, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, rotate: -3 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-white/80 border-2 border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center hover:border-blue-500 hover:scale-105 hover:bg-blue-100/40 transition duration-300 transform"
            >
              <div className="text-2xl">{fileType.icon}</div>
              <div className="text-sm font-medium mt-1">{fileType.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 space-y-2 text-gray-700 text-sm sm:text-base font-mono"
        >
          <li>✅ Support for all file types</li>
          <li>📏 Max 15MB per file</li>
          <li>🔐 Secure encryption</li>
          <li>⚡️ Lightning fast uploads</li>
          <li>🔒 End-to-end security</li>
          <li>🌐 Global CDN powered delivery</li>
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default Send;
