import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, X } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('无法访问摄像头，请确保已授予权限。');
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageSrc = canvas.toDataURL('image/jpeg');
        onCapture(imageSrc);
        stopCamera();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-surface-dark shadow-2xl border border-white/10">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h3 className="text-lg font-bold text-white">拍照上传</h3>
          <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="relative aspect-[3/4] w-full bg-black">
          {error ? (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center text-red-400">
              <p>{error}</p>
              <button 
                onClick={startCamera} 
                className="mt-4 flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20"
              >
                <RefreshCw size={16} /> 重试
              </button>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="flex items-center justify-center p-6">
          <button
            onClick={capturePhoto}
            disabled={!!error}
            className="group flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-transparent transition-transform active:scale-95 disabled:opacity-50"
          >
            <div className="h-12 w-12 rounded-full bg-white transition-colors group-hover:bg-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;