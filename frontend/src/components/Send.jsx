import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

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

  const handleClick = () => fileInputRef.current?.click();

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    setFileUpload(true);

    try {
      const response = await axios.post(`${API_BASE}/v1/file/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { file, downloadUrl, uniqueCode, expiresAt, qrCode } = response.data.data;

      toast.success("File Uploaded !", {
        position: "top-right"
      });
      setTimeout(() => {
        navigate("/fileReceived", {
          state: { file, downloadUrl, uniqueCode, qrCode, expiresAt },
        });
        window.location.reload(true);
      }, 6000);
    } catch (err) {
      toast.error("File not Uploaded",{position: 'top-left'})
      console.error("Upload error:", err);
    } finally {
      setFileUpload(false);
    }
  };

  return (
    <div
      id="send"
      className="flex flex-col items-center justify-center px-4 min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 pt-24"
    >
 <div className="flex justify-end">   <ToastContainer /></div> 
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-gray-700 mb-10"
      >
        Drag & drop your files <br />
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
        whileHover={{ scale: 1.01 }}
        className={`w-full max-w-2xl border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer shadow-lg backdrop-blur-md transition-all duration-300 ${
          isDragging
            ? "border-blue-500 bg-blue-100/30"
            : "border-gray-300 bg-white/70"
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
            <div className="text-lg text-blue-700 font-semibold animate-pulse">
              Uploading...
            </div>
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
            className="text-md font-semibold text-green-600 mt-2"
          >
            ✅ {fileName} uploaded!
          </motion.div>
        ) : (
          <>
            <div className="text-5xl mb-2">📂</div>
            <div className="text-lg text-gray-700 font-medium">
              Drop files here
            </div>
            <div className="text-sm text-gray-500 mt-1">
              or click to browse from your device
            </div>
            <p className="text-xs text-gray-400 mt-4 animate-pulse">
              Supports ZIPs, images, docs up to 15MB.
            </p>
          </>
        )}

        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {[
            { icon: "📄", label: "Documents" },
            { icon: "🎆", label: "Images" },
            { icon: "📹", label: "Videos" },
            { icon: "📦", label: "Archives" },
          ].map((type, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, rotate: -3 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-white border border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50"
            >
              <div className="text-2xl">{type.icon}</div>
              <div className="text-xs text-gray-600 font-medium mt-1">{type.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.ul
          className="mt-8 space-y-2 text-sm text-gray-600"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <li>✅ All file types supported</li>
          <li>📏 Max size: 15MB</li>
          <li>🔒 Encrypted upload</li>
          <li>⚡️ Fast & responsive</li>
          <li>🧨 Files auto-delete after 5 mins</li>
          <li>📧 Email sharing via Nodemailer</li>
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default Send;
