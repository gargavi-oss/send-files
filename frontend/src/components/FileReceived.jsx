import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FileReceived = () => {
  const [downloadLink, setDownloadLink] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [uniqueCode, setUniqueCode] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileType, setFileType] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("uploadData"));
    if (saved) {
      const now = Date.now();
      const diff = Math.floor(new Date(saved.expiresAt).getTime() - now) / 1000;
      if (diff > 0) {
        setFileName(saved.fileName);
        setFileSize(saved.fileSize);
        setFileType(saved.fileType);
        setDownloadLink(saved.downloadLink);
        setQrCode(saved.qrCode);
        setUniqueCode(saved.uniqueCode);
        setTimeLeft(diff);
      } else {
        localStorage.removeItem("uploadData");
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const updated = Math.max(0, prev - 1);
        if (updated === 0) {
          localStorage.removeItem("uploadData");
          setDownloadLink("");
          setQrCode("");
          setUniqueCode("");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleCancel = () => {
    setTimeLeft(null);
    setUniqueCode("");
    setDownloadLink("");
    setQrCode("");
    localStorage.removeItem("uploadData");
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 1000);
  };

  const handleSendEmail = async () => {
    if (!email) return alert("Please enter an email.");
    try {
      const response = await axios.post("/v1/file/send-email", {
        email,
        code: uniqueCode,
        link: downloadLink,
      });
      alert("✅ Email sent successfully!");
    } catch (err) {
      alert("❌ Failed to send email.");
      console.error(err);
    }
  };

  return (
    <div
      id="fileReceived"
      className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-tr from-white to-blue-100"
    >
      {uniqueCode && (
        <div className="text-xl font-mono bg-blue-50 border border-blue-300 p-4 rounded-lg shadow-sm mb-6">
          📦 Download Code: <strong>{uniqueCode}</strong>
        </div>
      )}

      {downloadLink ? (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center space-y-4">
          <h2 className="text-2xl font-bold text-blue-700">File Info</h2>

          <div className="text-left space-y-2">
            <p><strong>📄 Name:</strong> {fileName}</p>
            <p><strong>📦 Size:</strong> {(fileSize / 1024).toFixed(2)} KB</p>
            <p><strong>📁 Type:</strong> {fileType}</p>
          </div>

          <a
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            ⬇️ Download File
          </a>

          {qrCode && (
            <div className="mt-4">
              <img src={qrCode} alt="QR Code" className="mx-auto w-40" />
            </div>
          )}

          <div className="flex flex-col items-center mt-4">
            <input
              type="email"
              placeholder="Enter recipient email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-2"
            />
            <button
              onClick={handleSendEmail}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              ✉️ Send Email
            </button>
          </div>

          <button
            onClick={handleCancel}
            className="text-red-600 text-sm mt-4 hover:underline"
          >
            ❌ Cancel
          </button>
        </div>
      ) : (
        <div className="mt-4 text-gray-600">No file uploaded or code entered.</div>
      )}

      {timeLeft && (
        <div className="text-center text-gray-800 mt-8">
          <p className="text-lg mb-2">⏳ Link expires in:</p>
          <div className="text-4xl font-mono bg-white border border-gray-300 px-6 py-2 rounded-xl shadow">
            {timeLeft > 0 ? formatTime(timeLeft) : "Time's up!"}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileReceived;
