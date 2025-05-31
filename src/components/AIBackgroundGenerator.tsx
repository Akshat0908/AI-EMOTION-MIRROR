
import { useEffect, useState } from "react";

interface AIBackgroundGeneratorProps {
  emotion: string;
  intensity: number;
}

const AIBackgroundGenerator = ({ emotion, intensity }: AIBackgroundGeneratorProps) => {
  const [backgroundStyle, setBackgroundStyle] = useState<any>({});

  const generateMoodBackground = (emotion: string, intensity: number) => {
    const backgrounds = {
      happy: {
        background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
          rgba(255, 223, 0, ${0.3 + intensity * 0.4}) 0%, 
          rgba(255, 165, 0, ${0.2 + intensity * 0.3}) 50%, 
          rgba(255, 69, 0, ${0.1 + intensity * 0.2}) 100%)`,
        animation: 'pulse 2s ease-in-out infinite'
      },
      sad: {
        background: `linear-gradient(${Math.random() * 360}deg, 
          rgba(70, 130, 180, ${0.2 + intensity * 0.3}) 0%, 
          rgba(100, 149, 237, ${0.1 + intensity * 0.2}) 50%, 
          rgba(25, 25, 112, ${0.3 + intensity * 0.4}) 100%)`,
        animation: 'fadeInOut 3s ease-in-out infinite'
      },
      angry: {
        background: `conic-gradient(from ${Math.random() * 360}deg, 
          rgba(220, 20, 60, ${0.3 + intensity * 0.4}) 0deg, 
          rgba(255, 0, 0, ${0.2 + intensity * 0.3}) 120deg, 
          rgba(139, 0, 0, ${0.4 + intensity * 0.3}) 240deg, 
          rgba(220, 20, 60, ${0.3 + intensity * 0.4}) 360deg)`,
        animation: 'shake 1s ease-in-out infinite'
      },
      surprised: {
        background: `radial-gradient(ellipse at center, 
          rgba(255, 20, 147, ${0.2 + intensity * 0.3}) 0%, 
          rgba(138, 43, 226, ${0.3 + intensity * 0.4}) 50%, 
          rgba(75, 0, 130, ${0.1 + intensity * 0.2}) 100%)`,
        animation: 'bounce 1.5s ease-in-out infinite'
      },
      fear: {
        background: `linear-gradient(45deg, 
          rgba(128, 128, 128, ${0.3 + intensity * 0.4}) 0%, 
          rgba(169, 169, 169, ${0.2 + intensity * 0.3}) 50%, 
          rgba(105, 105, 105, ${0.4 + intensity * 0.3}) 100%)`,
        animation: 'tremble 0.5s ease-in-out infinite'
      },
      disgust: {
        background: `radial-gradient(circle, 
          rgba(144, 238, 144, ${0.2 + intensity * 0.3}) 0%, 
          rgba(60, 179, 113, ${0.3 + intensity * 0.4}) 50%, 
          rgba(46, 125, 50, ${0.1 + intensity * 0.2}) 100%)`,
        animation: 'wave 2.5s ease-in-out infinite'
      },
      neutral: {
        background: `linear-gradient(135deg, 
          rgba(200, 200, 200, ${0.1 + intensity * 0.2}) 0%, 
          rgba(220, 220, 220, ${0.2 + intensity * 0.3}) 100%)`,
        animation: 'none'
      }
    };

    return backgrounds[emotion as keyof typeof backgrounds] || backgrounds.neutral;
  };

  useEffect(() => {
    const style = generateMoodBackground(emotion, intensity);
    setBackgroundStyle(style);
  }, [emotion, intensity]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000"
      style={{
        background: backgroundStyle.background,
        animation: backgroundStyle.animation
      }}
    />
  );
};

export default AIBackgroundGenerator;
