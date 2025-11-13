// src/pages/SimpleCameraFeed.jsx
import React from 'react';
import { Camera, VideoOff, CheckCircle } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';

export default function SimpleCameraFeed({ onCapture }) {
  const { videoRef, isStreaming, error, startCamera, stopCamera } = useCamera();

  const handleCapture = () => {
    stopCamera();
    if (onCapture) onCapture();
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Error Display */}
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '16px',
          border: '1px solid #fecaca'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Video Container */}
      {isStreaming ? (
        <div>
          {/* VIDEO - MAIN ELEMENT */}
          <div style={{
            width: '100%',
            backgroundColor: '#000',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '16px',
            border: '3px solid #e5e7eb'
          }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover',
                transform: 'scaleX(-1)',
                backgroundColor: '#000000'
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={stopCamera}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              <VideoOff size={20} />
              Stop Camera
            </button>

            <button
              onClick={handleCapture}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#22c55e',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              <CheckCircle size={20} />
              Mark & Capture
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={startCamera}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            padding: '16px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          <Camera size={24} />
          Start Camera
        </button>
      )}
    </div>
  );
}
