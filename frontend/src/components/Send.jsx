import React, { useState, useRef, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ThemeContext from "../context/ThemeContext";

const API_BASE = import.meta.env.VITE_API_BASE;

const Send = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return toast.error("No file dropped!", { position: "top-right" });

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

      toast.success("File Uploaded!", { position: "top-right" });
      setTimeout(() => {
        navigate("/fileReceived", {
          state: { file, downloadUrl, uniqueCode, qrCode, expiresAt },
        });
        window.location.reload(true);
      }, 3000);
    } catch (err) {
      toast.error("File not uploaded", { position: 'top-right' });
      console.error("Upload error:", err);
    } finally {
      setFileUpload(false);
    }
  };

  return (
    <div
      id="send"
      className={`flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-6 md:px-8 pt-15  transition-all duration-500 ${
        theme === 'light'
          ? 'bg-gradient-to-l from-white to-blue-200'
          : 'bg-gradient-to-l from-[#0f0f0f] to-[#1f1f1f]'
      }`}
    >
      <ToastContainer />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`text-4xl font-extrabold text-center mb-10 ${
          theme === 'light'
            ? 'text-blue-800'
            : 'bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent'
        }`}
      >
        Drag & drop your files
        <br />
        <span className={theme === 'light' ? 'text-blue-600' : 'text-red-400'}>or click to browse</span>
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
        className={`w-full max-w-3xl border-4 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer shadow-lg backdrop-blur-md transition-all duration-300 ${theme==='light'? 'hover:border-blue-500': 'hover:border-red-500'} ${
          isDragging
            ? theme === 'light'
              ? 'border-blue-500 bg-blue-100/30'
              : 'border-pink-400 bg-[#1a1a1a]/30'
            : theme === 'light'
              ? 'border-gray-300 bg-white/70'
              : 'border-gray-700 bg-[#1a1a1a]/50'
        }`}
      >
        <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />

        {fileUpload ? (
          <>
            <div className={`text-lg font-semibold animate-pulse ${
              theme === 'light' ? 'text-blue-700' : 'text-pink-400 drop-shadow-[0_0_5px_rgba(255,0,128,0.6)]'
            }`}>Uploading...</div>

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
            className={`text-md font-semibold mt-2 ${
              theme === 'light' ? 'text-green-600' : 'text-green-400'
            }`}
          >
            ✅ {fileName} uploaded!
          </motion.div>
        ) : (
          <>
            <div className="text-5xl mb-2">📂</div>
            <div className={`text-lg font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
              Drop files here
            </div>
            <div className={`text-sm mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              or click to browse from your device
            </div>
            <p className={`text-xs mt-4 animate-pulse ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
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
              className={`w-24 h-24 rounded-lg shadow-md flex flex-col items-center justify-center transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 ${
                theme === 'light'
                  ? 'bg-white border border-gray-300 text-gray-700'
                  : 'bg-[#2a2a2a] border border-gray-600 text-gray-200 hover:text-gray-700 hover:bg-[#333]'
              }`}
            >
              <div className="text-2xl">{type.icon}</div>
              <div className="text-xs font-medium mt-1 text-center">
                {type.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.ul
          className={`mt-8 md:ml-8 max-w-xl flex-wrap gap-1 text-sm flex flex-row justify-center  text-center ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <li className="w-full sm:w-auto px-2">✅ All file types supported</li>
          <li className="w-full sm:w-auto px-2">📏 Max size: 15MB</li>
          <li className="w-full sm:w-auto px-2">🔒 Encrypted upload</li>
          <li className="w-full sm:w-auto px-2">⚡️ Fast & responsive</li>
          <li className="w-full sm:w-auto px-2">🧨 Auto-delete after 5 mins</li>
          <li className="w-full sm:w-auto px-2">📧 Email sharing available</li>
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default Send;
