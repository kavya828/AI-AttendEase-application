// src/hooks/useCamera.js
import { useRef, useState, useCallback } from 'react';

export const useCamera = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      console.log('🎥 Starting camera...');

      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      // Request camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 } 
        },
        audio: false,
      });

      streamRef.current = stream;
      console.log('✅ Stream obtained:', stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        console.log('📹 srcObject set');

        // Play immediately
        try {
          await videoRef.current.play();
          console.log('▶️ Video playing');
          setIsStreaming(true);
        } catch (playErr) {
          console.error('Play error:', playErr);
          setError('Could not play video');
        }
      }
    } catch (err) {
      console.error('❌ Camera error:', err);
      setError(err.message);
    }
  }, []);

  const stopCamera = useCallback(() => {
    console.log('🛑 Stopping camera');
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  return {
    videoRef,
    isStreaming,
    error,
    startCamera,
    stopCamera,
  };
};
