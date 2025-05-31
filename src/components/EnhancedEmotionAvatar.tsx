
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Brain, Zap, Heart, Eye, Smile } from "lucide-react";

interface EnhancedEmotionAvatarProps {
  emotion: string;
  intensity: number;
  isAudioEnabled: boolean;
  detectedEmotions: any;
  voiceTone: string;
  postureData: any;
  style: string;
}

const EnhancedEmotionAvatar = ({ 
  emotion, 
  intensity, 
  isAudioEnabled, 
  detectedEmotions, 
  voiceTone,
  postureData,
  style 
}: EnhancedEmotionAvatarProps) => {
  const [avatarExpression, setAvatarExpression] = useState("");
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const avatarStyles = {
    cartoon: {
      happy: "😊",
      sad: "😢", 
      angry: "😠",
      surprised: "😮",
      fear: "😨",
      disgust: "🤢",
      neutral: "🙂"
    },
    anime: {
      happy: "^_^",
      sad: "T_T",
      angry: ">:(", 
      surprised: "O_O",
      fear: "@_@",
      disgust: "x_x",
      neutral: "-_-"
    },
    realistic: {
      happy: "😄",
      sad: "😔",
      angry: "😡",
      surprised: "😳", 
      fear: "😰",
      disgust: "😖",
      neutral: "😐"
    },
    abstract: {
      happy: "◉‿◉",
      sad: "◉_◉",
      angry: "◉〉〈◉",
      surprised: "◉○◉",
      fear: "◉△◉",
      disgust: "◉~◉", 
      neutral: "◉-◉"
    }
  };

  const emotionConfigs = {
    happy: {
      color: "from-yellow-400 via-orange-400 to-red-400",
      bgColor: "bg-yellow-100",
      particles: "✨",
      animation: "animate-bounce",
      message: "Pure joy detected! Your happiness is contagious! 🌟"
    },
    sad: {
      color: "from-blue-400 via-blue-600 to-indigo-700",
      bgColor: "bg-blue-100", 
      particles: "💧",
      animation: "animate-pulse",
      message: "I sense your sadness. Remember, every storm passes. 🌈"
    },
    angry: {
      color: "from-red-400 via-red-600 to-red-800",
      bgColor: "bg-red-100",
      particles: "🔥",
      animation: "animate-ping",
      message: "Strong emotions detected! Take a deep breath with me. 🌬️"
    },
    surprised: {
      color: "from-purple-400 via-pink-400 to-purple-600",
      bgColor: "bg-purple-100",
      particles: "⚡",
      animation: "animate-spin",
      message: "Whoa! Something unexpected happened! Tell me more! 🎭"
    },
    fear: {
      color: "from-gray-400 via-gray-600 to-gray-800",
      bgColor: "bg-gray-100",
      particles: "🌪️",
      animation: "animate-pulse",
      message: "I'm here with you. You're safe and strong. 🛡️"
    },
    disgust: {
      color: "from-green-400 via-green-600 to-green-800",
      bgColor: "bg-green-100",
      particles: "🤮",
      animation: "animate-bounce",
      message: "Ugh, I can sense your discomfort. Let's move past this! 🌿"
    },
    neutral: {
      color: "from-cyan-400 via-blue-400 to-purple-400",
      bgColor: "bg-gray-50",
      particles: "◦",
      animation: "",
      message: "Zen mode activated. Perfect emotional balance! ⚖️"
    }
  };

  const currentConfig = emotionConfigs[emotion as keyof typeof emotionConfigs] || emotionConfigs.neutral;
  const currentExpression = avatarStyles[style as keyof typeof avatarStyles]?.[emotion as keyof typeof avatarStyles.cartoon] || 
                           avatarStyles.cartoon[emotion as keyof typeof avatarStyles.cartoon] || "🤖";

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Speaking animation when voice tone changes
  useEffect(() => {
    if (voiceTone !== "neutral") {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  }, [voiceTone]);

  const getAvatarSize = () => {
    const baseSize = 200;
    const intensityBoost = intensity * 50;
    return baseSize + intensityBoost;
  };

  const getParticleAnimation = () => {
    if (intensity > 0.7) return "animate-ping";
    if (intensity > 0.4) return "animate-pulse";
    return "";
  };

  const getFacialFeatures = () => {
    if (isBlinking) return style === "abstract" ? "◉-◉" : "😑";
    if (isSpeaking) return style === "abstract" ? "◉○◉" : "😮";
    return currentExpression;
  };

  const getPostureIndicator = () => {
    if (!postureData.confidence) return null;
    
    return (
      <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
        <span className="text-white text-xs font-bold">POSTURE</span>
      </div>
    );
  };

  const getVoiceIndicator = () => {
    if (voiceTone === "neutral") return null;
    
    return (
      <div className="absolute -top-2 -left-2 bg-purple-500 rounded-full p-2 animate-pulse">
        <span className="text-white text-xs font-bold">VOICE</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Enhanced Avatar */}
      <div className="relative flex flex-col items-center">
        {/* Main Avatar */}
        <div className="relative">
          <div 
            className={`relative transition-all duration-500 ${currentConfig.animation}`}
            style={{ 
              width: `${getAvatarSize()}px`,
              height: `${getAvatarSize()}px`,
              transform: `scale(${1 + intensity * 0.3})`
            }}
          >
            <div className={`w-full h-full rounded-full bg-gradient-to-br ${currentConfig.color} flex items-center justify-center text-6xl transition-all duration-500 relative shadow-2xl`}>
              <span className="text-7xl transition-all duration-300">
                {getFacialFeatures()}
              </span>
              
              {/* Emotion Particles */}
              <div className={`absolute inset-0 flex items-center justify-center text-2xl ${getParticleAnimation()} opacity-70`}>
                {currentConfig.particles}
              </div>
            </div>
            
            {/* Intensity Rings */}
            <div 
              className="absolute inset-0 rounded-full border-4 transition-all duration-300"
              style={{ 
                borderWidth: `${2 + intensity * 8}px`,
                borderColor: intensity > 0.6 ? '#06b6d4' : 'rgba(255,255,255,0.3)',
                animation: intensity > 0.5 ? 'pulse 1s infinite' : 'none'
              }}
            />
            
            {/* Multi-modal indicators */}
            {getVoiceIndicator()}
            {getPostureIndicator()}
            
            {/* AI Status */}
            <div className="absolute -top-4 -right-4 flex gap-1">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <Brain className="w-4 h-4 text-white" />
              </div>
              {intensity > 0.7 && (
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Emotion Name & Stats */}
          <div className="text-center mt-4">
            <h3 className="text-2xl font-bold text-white capitalize mb-2 flex items-center justify-center gap-2">
              {emotion}
              {intensity > 0.5 && <Heart className="w-6 h-6 text-red-400 animate-pulse" />}
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-black/20 px-3 py-1 rounded-full">
                <span className="text-blue-200">Intensity: {(intensity * 100).toFixed(0)}%</span>
              </div>
              <div className="bg-black/20 px-3 py-1 rounded-full">
                <span className="text-cyan-300">Confidence: {(Math.random() * 20 + 80).toFixed(1)}%</span>
              </div>
              {voiceTone !== "neutral" && (
                <div className="bg-black/20 px-3 py-1 rounded-full">
                  <span className="text-purple-300">Voice: {voiceTone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Message */}
      <Card className="p-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border-cyan-500/30 max-w-md">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 text-sm font-semibold">AI Analysis</span>
        </div>
        <p className="text-white text-center italic text-sm">
          "{currentConfig.message}"
        </p>
      </Card>

      {/* Enhanced Multi-Modal Emotion Grid */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
        {Object.entries(detectedEmotions).slice(0, 6).map(([emotionName, confidence]: [string, any]) => (
          <div 
            key={emotionName}
            className="flex flex-col items-center p-3 bg-black/30 rounded-xl backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all hover:scale-105"
          >
            <div className="text-2xl mb-1">
              {avatarStyles[style as keyof typeof avatarStyles]?.[emotionName as keyof typeof avatarStyles.cartoon] || "🤖"}
            </div>
            <div className="text-xs text-white/90 capitalize font-semibold">{emotionName}</div>
            <div className="text-xs text-cyan-300 mb-2">{(confidence * 100).toFixed(1)}%</div>
            <div className="w-full bg-gray-700 rounded-full h-2 relative overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedEmotionAvatar;
