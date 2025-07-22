import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FileReceived() {
  const { state } = useLocation();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!state?.expiresAt) return;
    const expiryTime = new Date(state.expiresAt).getTime();
    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
      setTimeLeft(diff);
    }, 1000);
    return () => clearInterval(interval);
  }, [state?.expiresAt]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (!state) return <div className="p-10">❌ No file data found</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 border shadow rounded-xl bg-white">
      <h2 className="text-xl font-bold mb-4">📦 File Received</h2>
      <p><strong>Name:</strong> {state.file?.name}</p>
      <p><strong>Code:</strong> {state.uniqueCode}</p>
      <p className="break-words">
        <strong>Download Link:</strong>{" "}
        <a href={state.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          {state.downloadUrl}
        </a>
      </p>
      {state.qrCode && (
        <div className="mt-4">
          <img src={state.qrCode} alt="QR Code" className="w-40 mx-auto" />
        </div>
      )}
      {timeLeft > 0 && (
        <p className="mt-6 text-center text-2xl text-red-600 font-mono">
          ⏳ Expires in: {formatTime(timeLeft)}
        </p>
      )}
    </div>
  );
}
