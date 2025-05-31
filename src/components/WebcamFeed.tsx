
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface WebcamFeedProps {
  isActive: boolean;
  onEmotionDetected: (emotion: string, intensity: number, allEmotions: any) => void;
}

const WebcamFeed = ({ isActive, onEmotionDetected }: WebcamFeedProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isActive) {
      startWebcam();
    } else {
      stopWebcam();
    }

    return () => {
      stopWebcam();
    };
  }, [isActive]);

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setError("");
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setError("Unable to access webcam. Please check permissions.");
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="relative">
      {error ? (
        <div className="w-full h-80 bg-gray-800 rounded-lg flex items-center justify-center">
          <p className="text-red-400 text-center px-4">{error}</p>
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-80 bg-gray-900 rounded-lg object-cover"
          style={{ transform: "scaleX(-1)" }} // Mirror effect
        />
      )}
      
      {isActive && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          LIVE
        </div>
      )}
    </div>
  );
};

export default WebcamFeed;
