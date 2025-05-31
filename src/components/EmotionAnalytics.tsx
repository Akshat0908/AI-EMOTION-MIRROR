
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, TrendingDown, Minus, Mic, Eye, Brain } from "lucide-react";

interface EmotionData {
  emotion: string;
  timestamp: number;
  intensity: number;
  voiceTone?: string;
  speechSentiment?: string;
}

interface EmotionAnalyticsProps {
  currentEmotion: string;
  currentIntensity: number;
  voiceTone?: string;
  speechSentiment?: string;
}

const EmotionAnalytics = ({ 
  currentEmotion, 
  currentIntensity, 
  voiceTone = "neutral",
  speechSentiment = "NEUTRAL" 
}: EmotionAnalyticsProps) => {
  const [emotionHistory, setEmotionHistory] = useState<EmotionData[]>([]);
  const [moodTrend, setMoodTrend] = useState<string>("stable");
  const [voicePatterns, setVoicePatterns] = useState<{[key: string]: number}>({});
  const [multiModalScore, setMultiModalScore] = useState<number>(0);

  useEffect(() => {
    if (currentEmotion && currentIntensity > 0.2) {
      const newEntry: EmotionData = {
        emotion: currentEmotion,
        timestamp: Date.now(),
        intensity: currentIntensity,
        voiceTone,
        speechSentiment
      };

      setEmotionHistory(prev => {
        const updated = [...prev, newEntry].slice(-30); // Keep last 30 entries
        
        // Analyze mood trend
        if (updated.length >= 5) {
          const recent = updated.slice(-5);
          const positiveEmotions = recent.filter(e => 
            ['happy', 'surprised'].includes(e.emotion)
          ).length;
          const negativeEmotions = recent.filter(e => 
            ['sad', 'angry', 'fear', 'disgust'].includes(e.emotion)
          ).length;

          if (positiveEmotions > negativeEmotions) {
            setMoodTrend("improving");
          } else if (negativeEmotions > positiveEmotions) {
            setMoodTrend("declining");
          } else {
            setMoodTrend("stable");
          }
        }

        // Analyze voice patterns
        const voiceData: {[key: string]: number} = {};
        updated.forEach(entry => {
          if (entry.voiceTone && entry.voiceTone !== "neutral") {
            voiceData[entry.voiceTone] = (voiceData[entry.voiceTone] || 0) + 1;
          }
        });
        setVoicePatterns(voiceData);

        // Calculate multi-modal confidence score
        const score = updated.length > 5 ? 
          (updated.filter(e => e.voiceTone && e.voiceTone !== "neutral").length / updated.length) * 100 : 0;
        setMultiModalScore(Math.round(score));

        return updated;
      });
    }
  }, [currentEmotion, currentIntensity, voiceTone, speechSentiment]);

  const getEmotionStats = () => {
    if (emotionHistory.length === 0) return {};

    const stats: { [key: string]: number } = {};
    emotionHistory.forEach(entry => {
      stats[entry.emotion] = (stats[entry.emotion] || 0) + 1;
    });

    const total = emotionHistory.length;
    Object.keys(stats).forEach(emotion => {
      stats[emotion] = Math.round((stats[emotion] / total) * 100);
    });

    return stats;
  };

  const getSentimentBalance = () => {
    const sentiments = emotionHistory.filter(e => e.speechSentiment).map(e => e.speechSentiment);
    const positive = sentiments.filter(s => s === "POSITIVE").length;
    const negative = sentiments.filter(s => s === "NEGATIVE").length;
    const neutral = sentiments.filter(s => s === "NEUTRAL").length;
    const total = sentiments.length;

    if (total === 0) return { positive: 0, negative: 0, neutral: 0 };

    return {
      positive: Math.round((positive / total) * 100),
      negative: Math.round((negative / total) * 100),
      neutral: Math.round((neutral / total) * 100)
    };
  };

  const stats = getEmotionStats();
  const sentimentBalance = getSentimentBalance();
  const avgIntensity = emotionHistory.length > 0 
    ? emotionHistory.reduce((sum, entry) => sum + entry.intensity, 0) / emotionHistory.length
    : 0;

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case "improving": return <TrendingUp className="w-4 h-4" />;
      case "declining": return <TrendingDown className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch(trend) {
      case "improving": return "text-green-400";
      case "declining": return "text-red-400";
      default: return "text-blue-400";
    }
  };

  return (
    <Card className="p-4 bg-black/20 backdrop-blur-sm border-cyan-500/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">AI Analytics</h3>
        </div>
        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500">
          Multi-Modal
        </Badge>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {/* Mood Trend */}
        <div className="text-center p-3 bg-black/20 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            {getTrendIcon(moodTrend)}
          </div>
          <div className="text-white font-semibold text-sm">Mood Trend</div>
          <div className={`capitalize text-xs ${getTrendColor(moodTrend)}`}>
            {moodTrend}
          </div>
        </div>

        {/* Average Intensity */}
        <div className="text-center p-3 bg-black/20 rounded-lg">
          <div className="text-xl mb-1">⚡</div>
          <div className="text-white font-semibold text-sm">Avg Intensity</div>
          <div className="text-yellow-400 text-xs">{(avgIntensity * 100).toFixed(0)}%</div>
        </div>

        {/* Multi-Modal Score */}
        <div className="text-center p-3 bg-black/20 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Brain className="w-4 h-4" />
          </div>
          <div className="text-white font-semibold text-sm">AI Confidence</div>
          <div className="text-purple-400 text-xs">{multiModalScore}%</div>
        </div>

        {/* Data Points */}
        <div className="text-center p-3 bg-black/20 rounded-lg">
          <div className="text-xl mb-1">📊</div>
          <div className="text-white font-semibold text-sm">Data Points</div>
          <div className="text-cyan-400 text-xs">{emotionHistory.length}</div>
        </div>
      </div>

      {/* Emotion Distribution */}
      {Object.keys(stats).length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-green-400" />
            <span className="text-white font-semibold text-sm">Facial Emotion Distribution</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(stats).map(([emotion, percentage]) => (
              <div key={emotion} className="flex justify-between items-center p-2 bg-black/10 rounded">
                <span className="text-white/80 capitalize text-xs">{emotion}</span>
                <span className="text-cyan-300 text-xs">{percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Voice & Sentiment Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Voice Patterns */}
        {Object.keys(voicePatterns).length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mic className="w-4 h-4 text-purple-400" />
              <span className="text-white font-semibold text-sm">Voice Patterns</span>
            </div>
            <div className="space-y-1">
              {Object.entries(voicePatterns).map(([tone, count]) => (
                <div key={tone} className="flex justify-between items-center text-xs">
                  <span className="text-purple-300 capitalize">{tone}</span>
                  <span className="text-white">{count}x</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sentiment Balance */}
        {sentimentBalance.positive + sentimentBalance.negative + sentimentBalance.neutral > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-orange-400" />
              <span className="text-white font-semibold text-sm">Speech Sentiment</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-green-300">Positive</span>
                <span className="text-white">{sentimentBalance.positive}%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-red-300">Negative</span>
                <span className="text-white">{sentimentBalance.negative}%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-blue-300">Neutral</span>
                <span className="text-white">{sentimentBalance.neutral}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EmotionAnalytics;
