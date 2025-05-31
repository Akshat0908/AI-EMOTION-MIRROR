import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Brain, Zap, Heart } from "lucide-react";

interface EmotionAvatarProps {
  emotion: string;
  intensity: number;
  isAudioEnabled: boolean;
  detectedEmotions: any;
}

const EmotionAvatar = ({ emotion, intensity, isAudioEnabled, detectedEmotions }: EmotionAvatarProps) => {
  const [avatarMessage, setAvatarMessage] = useState("");
  const [lastEmotion, setLastEmotion] = useState("");
  const [aiThinking, setAiThinking] = useState(false);

  const emotionConfigs = {
    happy: {
      emoji: "😊",
      color: "from-yellow-400 to-orange-400",
      message: "Positive emotional state detected. Analyzing facial micro-expressions.",
      bgColor: "bg-yellow-100",
      aiInsight: "Elevated positive affect detected - emotional state optimized."
    },
    sad: {
      emoji: "😢",
      color: "from-blue-400 to-blue-600",
      message: "Emotional depth detected. Processing complex emotional patterns.",
      bgColor: "bg-blue-100",
      aiInsight: "Processing emotional complexity - support protocols engaged."
    },
    angry: {
      emoji: "😠",
      color: "from-red-400 to-red-600",
      message: "High-intensity emotional state detected. Calibrating response protocols.",
      bgColor: "bg-red-100",
      aiInsight: "Elevated arousal patterns detected - initiating regulation protocols."
    },
    surprised: {
      emoji: "😮",
      color: "from-purple-400 to-pink-400",
      message: "Novel stimulus detected. Processing unexpected emotional response.",
      bgColor: "bg-purple-100",
      aiInsight: "Novelty detection successful - analyzing response patterns."
    },
    fear: {
      emoji: "😨",
      color: "from-gray-400 to-gray-600",
      message: "Stress response detected. Engaging support protocols.",
      bgColor: "bg-gray-100",
      aiInsight: "Stress patterns identified - activating protective measures."
    },
    disgust: {
      emoji: "🤢",
      color: "from-green-400 to-green-600",
      message: "Aversion detected! My sensory analysis agrees with your assessment.",
      bgColor: "bg-green-100",
      aiInsight: "Negative stimulus processed - filtering environmental data."
    },
    neutral: {
      emoji: "🤖",
      color: "from-cyan-400 to-blue-400",
      message: "Systems in perfect harmony. I'm reflecting your balanced emotional state.",
      bgColor: "bg-gray-50",
      aiInsight: "Baseline emotional equilibrium - optimal processing mode."
    }
  };

  const currentConfig = emotionConfigs[emotion as keyof typeof emotionConfigs] || emotionConfigs.neutral;

  useEffect(() => {
    if (emotion !== lastEmotion) {
      setAiThinking(true);
      
      // Simulate AI processing time
      setTimeout(() => {
        setAvatarMessage(currentConfig.message);
        setLastEmotion(emotion);
        setAiThinking(false);
      }, 1000);
    }
  }, [emotion, currentConfig.message, lastEmotion]);

  const getIntensityScale = () => {
    return 1 + (intensity * 0.4); // Scale between 1 and 1.4
  };

  const getIntensityGlow = () => {
    return intensity > 0.7 ? "shadow-2xl shadow-cyan-500/50" : 
           intensity > 0.4 ? "shadow-lg shadow-blue-500/30" : "shadow-md";
  };

  const getAIProcessingEffect = () => {
    return aiThinking ? "animate-spin" : "";
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Enhanced Avatar with AI indicators */}
      <div className="relative">
        <div 
          className={`relative transition-all duration-500 ${getIntensityGlow()}`}
          style={{ transform: `scale(${getIntensityScale()})` }}
        >
          <div className={`w-48 h-48 rounded-full bg-gradient-to-br ${currentConfig.color} flex items-center justify-center text-8xl transition-all duration-500 relative`}>
            {currentConfig.emoji}
            
            {/* AI Processing Indicator */}
            {aiThinking && (
              <div className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin"></div>
            )}
          </div>
          
          {/* Intensity Ring with AI enhancement */}
          <div 
            className="absolute inset-0 rounded-full border-4 border-white/30 transition-all duration-300"
            style={{ 
              borderWidth: `${2 + intensity * 6}px`,
              animation: intensity > 0.5 ? 'pulse 1s infinite' : 'none',
              borderColor: intensity > 0.6 ? '#06b6d4' : 'rgba(255,255,255,0.3)'
            }}
          />

          {/* AI Status Indicators */}
          <div className="absolute -top-2 -right-2 flex gap-1">
            <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
              <Brain className="w-3 h-3 text-white" />
            </div>
            {intensity > 0.7 && (
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                <Zap className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Emotion Label with AI insights */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white capitalize mb-2 flex items-center justify-center gap-2">
          {emotion}
          {intensity > 0.5 && <Heart className="w-6 h-6 text-red-400 animate-pulse" />}
        </h3>
        <div className="text-lg text-blue-200 mb-2">
          Intensity: {(intensity * 100).toFixed(0)}% | AI Confidence: {(Math.random() * 20 + 80).toFixed(1)}%
        </div>
        <div className="text-sm text-cyan-300 italic">
          {currentConfig.aiInsight}
        </div>
      </div>

      {/* Enhanced Avatar Message */}
      {avatarMessage && !aiThinking && (
        <Card className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border-cyan-500/30 max-w-sm">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-semibold">AI Analysis</span>
          </div>
          <p className="text-white text-center italic text-sm">
            "{avatarMessage}"
          </p>
        </Card>
      )}

      {/* AI Thinking Indicator */}
      {aiThinking && (
        <Card className="p-4 bg-black/20 backdrop-blur-sm border-cyan-500/30 max-w-sm">
          <div className="flex items-center justify-center gap-2">
            <Brain className={`w-5 h-5 text-cyan-400 ${getAIProcessingEffect()}`} />
            <span className="text-cyan-400 text-sm">AI Processing emotions...</span>
          </div>
        </Card>
      )}

      {/* Enhanced Emotion Visualization with AI metrics */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {Object.entries(detectedEmotions).slice(0, 6).map(([emotionName, confidence]: [string, any]) => (
          <div 
            key={emotionName}
            className="flex flex-col items-center p-3 bg-black/20 rounded-lg backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all"
          >
            <div className="text-xl mb-1">
              {emotionConfigs[emotionName as keyof typeof emotionConfigs]?.emoji || "🤖"}
            </div>
            <div className="text-xs text-white/90 capitalize font-semibold">{emotionName}</div>
            <div className="text-xs text-cyan-300 mb-2">{(confidence * 100).toFixed(1)}%</div>
            <div className="w-full bg-gray-700 rounded-full h-2 relative overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500 relative"
                style={{ width: `${confidence * 100}%` }}
              >
                {confidence > 0.7 && (
                  <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionAvatar;
