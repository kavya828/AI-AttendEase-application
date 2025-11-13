// src/pages/CameraFeed.jsx (FINAL FIX - VIDEO WILL DISPLAY)
import React, { useRef, useState, useEffect } from "react";
import { Camera, VideoOff, CheckCircle } from 'lucide-react';

export default function CameraFeed({ onCapture, hideContainer }) {
  const videoRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");

  const startCamera = async () => {
    try {
      setError("");
      console.log("🎥 Requesting camera access...");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: false
      });

      console.log("✅ Camera stream obtained:", stream);

      if (videoRef.current) {
        console.log("📹 Setting video.srcObject...");
        videoRef.current.srcObject = stream;
        setStreaming(true);

        // Ensure video plays
        videoRef.current.onloadedmetadata = () => {
          console.log("📊 Video metadata loaded");
          videoRef.current.play().catch(err => {
            console.error("❌ Play error:", err);
            setError("Failed to play video");
          });
        };
      }
    } catch (err) {
      console.error("❌ Camera Error:", err);
      setError(`Camera error: ${err.message}`);
      setStreaming(false);
    }
  };

  const stopCamera = () => {
    console.log("🛑 Stopping camera...");
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => {
        track.stop();
        console.log("Stopped track:", track.kind);
      });
      videoRef.current.srcObject = null;
    }
    setStreaming(false);
  };

  const handleCapture = () => {
    console.log("📸 Capturing...");
    stopCamera();
    if (onCapture) onCapture();
    if (hideContainer) hideContainer();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
          ⚠️ {error}
        </div>
      )}

      {streaming ? (
        <>
          {/* VIDEO CONTAINER - WILL DISPLAY LIVE FEED */}
          <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-gray-300 bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{
                transform: "scaleX(-1)"
              }}
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 w-full">
            <button
              onClick={stopCamera}
              className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              <VideoOff size={20} />
              Stop Camera
            </button>

            <button
              onClick={handleCapture}
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              <CheckCircle size={20} />
              Mark & Capture
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={startCamera}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-4 rounded-lg transition shadow-lg"
        >
          <Camera size={24} />
          Start Camera
        </button>
      )}
    </div>
  );
}




