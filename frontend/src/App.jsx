import axios from "axios";
import { useState, useRef, useEffect } from "react";
const API_BASE = import.meta.env.VITE_API_BASE;



const FileUpload = ({ fileId }) => {
  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");
  const [qrCode, setQrCode] = useState("");
  const fileInputRef = useRef(null);
  const [uniqueCode, setUniqueCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("uploadData"));
    if (saved) {
      const now = Date.now();
      const diff = Math.floor((new Date(saved.expiresAt).getTime() - now) / 1000);
      if (diff > 0) {
        setDownloadLink(saved.downloadLink);
        setQrCode(saved.qrCode);
        setUniqueCode(saved.uniqueCode);
        setTimeLeft(diff);
      } else {
        localStorage.removeItem("uploadData"); // expired
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
          setFile(null);
          setUniqueCode("");
          setCode("");
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${API_BASE}/v1/file/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { downloadUrl, qrCode, uniqueCode, expiresAt } = response.data.data;

      setDownloadLink(downloadUrl);
      setQrCode(qrCode);
      setUniqueCode(uniqueCode);
      const expiry = new Date(expiresAt).getTime();
      const now = Date.now();
      const diff = Math.floor((expiry - now) / 1000);
      setTimeLeft(diff);

      localStorage.setItem(
        "uploadData",
        JSON.stringify({
          downloadLink: downloadUrl,
          qrCode,
          uniqueCode,
          expiresAt,
        })
      );
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleDownload = () => {
    if (!code.trim()) return alert("Enter a valid code");
    window.location.href = `${API_BASE}/v1/file/download/code/${code}`;
  };

  return (
    <div className="p-5">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>

      {uniqueCode && (
        <div className="mt-4 text-lg font-mono">
          📦 Your download code: <strong>{uniqueCode}</strong>
        </div>
      )}

      {downloadLink && (
        <div className="mt-4">
          <p>🔗 <a href={downloadLink} target="_blank" rel="noopener noreferrer">{downloadLink}</a></p>
          {qrCode && <img src={qrCode} alt="QR Code" className="mt-2 w-40" />}
        </div>
      )}

      {timeLeft && (
        <div
          style={{
            fontSize: "48px",
            textAlign: "center",
            padding: "20px",
            border: "2px solid #ccc",
            borderRadius: "10px",
            width: "200px",
            margin: "100px auto",
            background: "#fff",
          }}
        >
          {timeLeft > 0 ? formatTime(timeLeft) : "⏰ Time's up!"}
        </div>
      )}

      <div className="p-5">
        <input
          type="text"
          placeholder="Enter download code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Download File
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
