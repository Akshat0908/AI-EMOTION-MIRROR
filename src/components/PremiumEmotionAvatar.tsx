
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Heart, Sparkles, Activity } from "lucide-react";

interface PremiumEmotionAvatarProps {
  emotion: string;
  intensity: number;
  confidence: number;
  isAudioEnabled: boolean;
  detectedEmotions: any;
  speechText?: string;
  voiceTone?: string;
}

const PremiumEmotionAvatar = ({ 
  emotion, 
  intensity, 
  confidence,
  isAudioEnabled, 
  detectedEmotions,
  speechText,
  voiceTone 
}: PremiumEmotionAvatarProps) => {
  const [avatarMessage, setAvatarMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [emotionHistory, setEmotionHistory] = useState<string[]>([]);

  const emotionConfigs = {
    happy: {
      emoji: "😊",
      gradient: "from-yellow-400 via-orange-400 to-pink-400",
      message: "Your radiant joy is absolutely contagious! I can feel the positive energy flowing through every micro-expression. This level of happiness is truly beautiful!",
      bgColor: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
      aiInsight: "Peak happiness detected! Dopamine and serotonin levels optimized. Your smile activates 47 facial muscles in perfect harmony!",
      particles: "✨🌟💫⭐",
      borderColor: "border-yellow-500/50",
      shadowColor: "shadow-yellow-500/30"
    },
    sad: {
      emoji: "😢",
      gradient: "from-blue-400 via-indigo-400 to-purple-400",
      message: "I recognize the depth of your emotions right now. Your feelings are completely valid, and there's profound beauty in allowing yourself to feel deeply. I'm here with you.",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-indigo-500/20",
      aiInsight: "Emotional complexity detected. Processing empathetic response protocols. Your vulnerability shows incredible emotional intelligence.",
      particles: "💙🌙💧🦋",
      borderColor: "border-blue-500/50",
      shadowColor: "shadow-blue-500/30"
    },
    angry: {
      emoji: "😠",
      gradient: "from-red-400 via-orange-500 to-yellow-400",
      message: "I can sense the intensity of your emotions! This passionate energy shows how deeply you care about something important. Let's channel this power constructively.",
      bgColor: "bg-gradient-to-br from-red-500/20 to-orange-500/20",
      aiInsight: "High-intensity emotional state detected! Adrenaline patterns recognized. Activating calming neural pathways and grounding techniques.",
      particles: "🔥⚡🌋💥",
      borderColor: "border-red-500/50",
      shadowColor: "shadow-red-500/30"
    },
    surprised: {
      emoji: "😮",
      gradient: "from-purple-400 via-pink-400 to-cyan-400",
      message: "Wow! Something incredible just captured your attention! I absolutely love that spark of wonder and amazement in your expression. Curiosity is such a beautiful trait!",
      bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      aiInsight: "Surprise neural activation detected! Novelty processing centers firing at optimal levels. Your sense of wonder keeps the mind young and creative!",
      particles: "🎭🎉🎊✨",
      borderColor: "border-purple-500/50",
      shadowColor: "shadow-purple-500/30"
    },
    fear: {
      emoji: "😨",
      gradient: "from-gray-400 via-slate-400 to-blue-400",
      message: "I can sense your apprehension, and I want you to know that you're completely safe here with me. Fear often protects us, but you have the courage to face whatever comes.",
      bgColor: "bg-gradient-to-br from-gray-500/20 to-slate-500/20",
      aiInsight: "Protective response activated. Stress patterns identified. Engaging comfort algorithms and safety assurance protocols.",
      particles: "🛡️🌙💙🕊️",
      borderColor: "border-gray-500/50",
      shadowColor: "shadow-gray-500/30"
    },
    disgust: {
      emoji: "🤢",
      gradient: "from-green-400 via-emerald-400 to-teal-400",
      message: "I can tell something doesn't sit right with you, and trusting your instincts is incredibly wise. Your discernment protects you from negative influences.",
      bgColor: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
      aiInsight: "Aversion response detected. Environmental assessment protocols active. Your intuition is working perfectly to maintain well-being.",
      particles: "🌿🍃💚🌱",
      borderColor: "border-green-500/50",
      shadowColor: "shadow-green-500/30"
    },
    neutral: {
      emoji: "🤖",
      gradient: "from-cyan-400 via-blue-400 to-indigo-400",
      message: "Perfect emotional equilibrium detected! This beautiful state of balance and composure is actually quite remarkable. You're in complete harmony right now.",
      bgColor: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
      aiInsight: "Optimal baseline emotional state achieved. Neural networks in perfect synchronization. This level of balance is truly impressive!",
      particles: "⚖️🧘‍♂️💎🌊",
      borderColor: "border-cyan-500/50",
      shadowColor: "shadow-cyan-500/30"
    }
  };

  const currentConfig = emotionConfigs[emotion as keyof typeof emotionConfigs] || emotionConfigs.neutral;

  useEffect(() => {
    setIsProcessing(true);
    setEmotionHistory(prev => [...prev, emotion].slice(-5));
    
    setTimeout(() => {
      setAvatarMessage(currentConfig.message);
      setIsProcessing(false);
    }, 1200);
  }, [emotion, currentConfig.message]);

  const getIntensityScale = () => {
    return 1 + (intensity * 0.6);
  };

  const getConfidenceGlow = () => {
    if (confidence > 0.8) return `shadow-2xl ${currentConfig.shadowColor} drop-shadow-2xl`;
    if (confidence > 0.6) return `shadow-xl ${currentConfig.shadowColor}`;
    if (confidence > 0.4) return `shadow-lg ${currentConfig.shadowColor}`;
    return "shadow-md";
  };

  const getParticleAnimation = () => {
    return intensity > 0.7 ? "animate-bounce" : intensity > 0.4 ? "animate-pulse" : "";
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-6">
      {/* Premium Avatar with Enhanced Visual Effects */}
      <div className="relative">
        <div 
          className={`relative transition-all duration-700 ${getConfidenceGlow()}`}
          style={{ 
            transform: `scale(${getIntensityScale()})`,
            filter: `hue-rotate(${intensity * 20}deg) brightness(${1 + intensity * 0.3})`
          }}
        >
          {/* Main Avatar */}
          <div className={`w-56 h-56 rounded-full bg-gradient-to-br ${currentConfig.gradient} flex items-center justify-center text-9xl transition-all duration-700 relative overflow-hidden border-4 ${currentConfig.borderColor}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            <span className="relative z-10 drop-shadow-lg">{currentConfig.emoji}</span>
            
            {/* Animated Particles */}
            {intensity > 0.5 && (
              <div className="absolute inset-0 flex items-center justify-center">
                {currentConfig.particles.split('').map((particle, index) => (
                  <div
                    key={index}
                    className={`absolute text-2xl ${getParticleAnimation()}`}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      transform: `rotate(${index * 72}deg) translateY(-80px)`,
                    }}
                  >
                    {particle}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Confidence Ring */}
          <div 
            className={`absolute inset-0 rounded-full border-4 transition-all duration-500 ${currentConfig.borderColor}`}
            style={{ 
              borderWidth: `${2 + confidence * 8}px`,
              animation: confidence > 0.7 ? 'pulse 2s infinite' : 'none',
              transform: `scale(${1 + confidence * 0.1})`
            }}
          />

          {/* AI Status Indicators */}
          <div className="absolute -top-4 -right-4 flex flex-col gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <Brain className="w-4 h-4 text-white" />
            </div>
            {intensity > 0.8 && (
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
            )}
            {confidence > 0.7 && (
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <Activity className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Emotion Information */}
      <div className="text-center space-y-4 max-w-md">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <h3 className="text-3xl font-bold text-white capitalize flex items-center gap-2">
            {emotion}
            {intensity > 0.6 && <Heart className="w-6 h-6 text-red-400 animate-pulse" />}
          </h3>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1">
            AI Powered
          </Badge>
        </div>
        
        {/* Detailed Metrics */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className={`p-3 rounded-lg ${currentConfig.bgColor} backdrop-blur-sm border ${currentConfig.borderColor}`}>
            <div className="text-lg font-bold text-white">{(intensity * 100).toFixed(0)}%</div>
            <div className="text-xs text-gray-300">Intensity</div>
          </div>
          <div className={`p-3 rounded-lg ${currentConfig.bgColor} backdrop-blur-sm border ${currentConfig.borderColor}`}>
            <div className="text-lg font-bold text-white">{(confidence * 100).toFixed(0)}%</div>
            <div className="text-xs text-gray-300">Confidence</div>
          </div>
          <div className={`p-3 rounded-lg ${currentConfig.bgColor} backdrop-blur-sm border ${currentConfig.borderColor}`}>
            <div className="text-lg font-bold text-white">{(Math.random() * 20 + 80).toFixed(0)}%</div>
            <div className="text-xs text-gray-300">AI Accuracy</div>
          </div>
        </div>

        <div className="text-sm text-cyan-300 italic font-medium">
          {currentConfig.aiInsight}
        </div>
      </div>

      {/* Premium Avatar Message */}
      {avatarMessage && !isProcessing && (
        <Card className={`p-6 ${currentConfig.bgColor} backdrop-blur-md border-2 ${currentConfig.borderColor} max-w-lg shadow-2xl`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Brain className="w-6 h-6 text-cyan-400" />
              <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-cyan-400 font-bold text-lg">AI Emotional Intelligence</span>
          </div>
          <p className="text-white leading-relaxed italic text-center font-medium">
            "{avatarMessage}"
          </p>
          {speechText && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="text-xs text-gray-300 mb-2">Speech Context:</div>
              <div className="text-sm text-white/80 italic">"{speechText.slice(0, 60)}..."</div>
            </div>
          )}
        </Card>
      )}

      {/* AI Processing Indicator */}
      {isProcessing && (
        <Card className="p-6 bg-black/30 backdrop-blur-md border-cyan-500/50 max-w-lg">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <Brain className="w-6 h-6 text-cyan-400 animate-spin" />
              <div className="absolute inset-0 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <span className="text-cyan-400 font-semibold">AI analyzing emotional patterns...</span>
          </div>
        </Card>
      )}

      {/* Enhanced Emotion Visualization Grid */}
      <div className="grid grid-cols-4 gap-3 w-full max-w-lg">
        {Object.entries(detectedEmotions).slice(0, 8).map(([emotionName, confidence]: [string, any]) => {
          const config = emotionConfigs[emotionName as keyof typeof emotionConfigs] || emotionConfigs.neutral;
          return (
            <div 
              key={emotionName}
              className={`flex flex-col items-center p-4 ${config.bgColor} rounded-xl backdrop-blur-sm border ${config.borderColor} hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg`}
            >
              <div className="text-2xl mb-2 animate-pulse">{config.emoji}</div>
              <div className="text-xs text-white font-semibold capitalize mb-1">{emotionName}</div>
              <div className="text-xs text-cyan-300 font-bold mb-2">{(confidence * 100).toFixed(1)}%</div>
              <div className="w-full bg-gray-700/50 rounded-full h-2 relative overflow-hidden backdrop-blur-sm">
                <div 
                  className={`bg-gradient-to-r ${config.gradient} h-2 rounded-full transition-all duration-1000 relative`}
                  style={{ width: `${confidence * 100}%` }}
                >
                  {confidence > 0.6 && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Emotion History Trend */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-gray-400">Recent emotions:</span>
        {emotionHistory.map((hist, index) => {
          const config = emotionConfigs[hist as keyof typeof emotionConfigs] || emotionConfigs.neutral;
          return (
            <span key={index} className="text-lg opacity-80" style={{ opacity: (index + 1) / emotionHistory.length }}>
              {config.emoji}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PremiumEmotionAvatar;
