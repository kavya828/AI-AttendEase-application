import { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WebcamFeed({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startCamera = async () => {
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      alert('❌ Camera Error: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setIsStreaming(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      
      stopCamera();
      alert('✅ Attendance marked successfully!');
      onCapture && onCapture();
    }
  };

  return (
    <div className="w-full space-y-2 sm:space-y-3 p-2 sm:p-4">
  {/* Video Feed */}
  <div className="relative w-full bg-black rounded-md sm:rounded-lg overflow-hidden">
    <video
      ref={videoRef}
      className="w-full h-36 sm:h-64 object-cover"
      autoPlay
      playsInline
    />
    {isStreaming && (
      <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-0.5 sm:gap-1">
        <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full animate-pulse" />
        LIVE
      </div>
    )}
  </div>
  {/* Hidden Canvas */}
  <canvas ref={canvasRef} className="hidden" />
  {/* Buttons */}
  <div className="space-y-1 sm:space-y-2">
    {!isStreaming ? (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={startCamera}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-xs sm:text-base py-2 sm:py-3 rounded-md sm:rounded-lg font-bold shadow-lg flex items-center justify-center gap-1 sm:gap-2 hover:shadow-xl transition disabled:opacity-50"
      >
        <Camera size={16} className="sm:size-[20px]" />
        {isLoading ? 'Starting...' : 'Start Camera'}
      </motion.button>
    ) : (
      <div className="grid grid-cols-2 gap-1 sm:gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={capturePhoto}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-xs sm:text-base py-2 sm:py-3 rounded-md sm:rounded-lg font-bold shadow-lg flex items-center justify-center gap-1 sm:gap-2 hover:shadow-xl transition"
        >
          <Camera size={13} className="sm:size-[18px]" />
          Capture
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={stopCamera}
          className="bg-red-500 hover:bg-red-600 text-xs sm:text-base py-2 sm:py-3 rounded-md sm:rounded-lg font-bold shadow-lg flex items-center justify-center gap-1 sm:gap-2 transition"
        >
          <X size={13} className="sm:size-[18px]" />
          Stop
        </motion.button>
      </div>
    )}
  </div>
  {/* Ready Status */}
  {isStreaming && (
    <div className="bg-green-100 border border-green-300 rounded-md sm:rounded-lg p-1.5 sm:p-2 text-center">
      <p className="text-green-800 font-semibold text-[10px] sm:text-xs">📷 Ready to capture!</p>
    </div>
  )}
</div>


  );
}
