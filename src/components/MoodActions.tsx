
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Heart, Coffee, Lightbulb, Zap, BookOpen } from "lucide-react";

interface MoodActionsProps {
  currentEmotion: string;
  intensity: number;
  speechSentiment: string;
}

const MoodActions = ({ currentEmotion, intensity, speechSentiment }: MoodActionsProps) => {
  const [triggeredAction, setTriggeredAction] = useState<string>("");
  const [autoActions, setAutoActions] = useState<string[]>([]);

  const moodActionSuggestions = {
    happy: {
      icon: "🎵",
      color: "from-yellow-400 to-orange-400",
      actions: [
        { icon: Music, label: "Play Upbeat Music", desc: "Celebrate with energetic tunes!" },
        { icon: Heart, label: "Share Joy", desc: "Spread positivity to friends!" },
        { icon: Zap, label: "Capture Moment", desc: "Save this happy memory!" }
      ],
      quotes: [
        "Keep shining bright! ✨",
        "Your joy is contagious! 🌟", 
        "Dance like nobody's watching! 💃"
      ]
    },
    sad: {
      icon: "🎭",
      color: "from-blue-400 to-blue-600",
      actions: [
        { icon: Music, label: "Comfort Playlist", desc: "Soothing music for healing" },
        { icon: BookOpen, label: "Guided Meditation", desc: "Find inner peace" },
        { icon: Heart, label: "Self-Care Tips", desc: "Be gentle with yourself" }
      ],
      quotes: [
        "This feeling will pass. You're stronger than you know. 💙",
        "It's okay to feel. Healing takes time. 🌱",
        "Tomorrow is a new day with new possibilities. 🌅"
      ]
    },
    angry: {
      icon: "🔥",
      color: "from-red-400 to-red-600", 
      actions: [
        { icon: Zap, label: "Breathing Exercise", desc: "Channel energy positively" },
        { icon: Coffee, label: "Take a Break", desc: "Step away and reset" },
        { icon: Lightbulb, label: "Problem Solving", desc: "Transform anger into action" }
      ],
      quotes: [
        "Deep breaths. You've got this. 🌬️",
        "Strong emotions = strong person. Use this power wisely. ⚡",
        "Every challenge is an opportunity to grow. 🌱"
      ]
    },
    surprised: {
      icon: "⚡",
      color: "from-purple-400 to-pink-400",
      actions: [
        { icon: Lightbulb, label: "Explore Further", desc: "Dive deeper into this discovery!" },
        { icon: Heart, label: "Share Discovery", desc: "Tell someone about this!" },
        { icon: BookOpen, label: "Learn More", desc: "Curiosity is beautiful!" }
      ],
      quotes: [
        "Wow! Life is full of amazing surprises! 🎭",
        "Stay curious, stay amazed! 🔍",
        "Wonder is the beginning of wisdom! ✨"
      ]
    },
    fear: {
      icon: "🛡️",
      color: "from-gray-400 to-gray-600",
      actions: [
        { icon: Heart, label: "Comfort Zone", desc: "You're safe here" },
        { icon: Lightbulb, label: "Face the Fear", desc: "Small steps toward courage" },
        { icon: BookOpen, label: "Calming Resources", desc: "Tools for peace of mind" }
      ],
      quotes: [
        "Courage isn't the absence of fear, it's acting despite it. 🦁",
        "You're braver than you believe. 💪",
        "This feeling is temporary. You are permanent. 🌟"
      ]
    },
    neutral: {
      icon: "⚖️", 
      color: "from-cyan-400 to-blue-400",
      actions: [
        { icon: Coffee, label: "Mindful Moment", desc: "Appreciate this calm" },
        { icon: Lightbulb, label: "Set Intention", desc: "What would you like to feel?" },
        { icon: BookOpen, label: "Gentle Activity", desc: "Maybe read or reflect?" }
      ],
      quotes: [
        "Peace is not the absence of emotion, but the mastery of it. 🧘",
        "In stillness, we find our strength. 🌊",
        "Balanced energy is beautiful energy. ⚖️"
      ]
    }
  };

  const currentMood = moodActionSuggestions[currentEmotion as keyof typeof moodActionSuggestions] || moodActionSuggestions.neutral;

  // Auto-trigger actions based on intensity
  useEffect(() => {
    if (intensity > 0.8) {
      const newAction = `High ${currentEmotion} intensity detected! Auto-suggesting ${currentMood.actions[0].label.toLowerCase()}.`;
      setAutoActions(prev => [...prev, newAction].slice(-3));
    }
  }, [currentEmotion, intensity]);

  const handleActionClick = (action: any) => {
    setTriggeredAction(`${action.label}: ${action.desc}`);
    
    // Simulate action execution
    setTimeout(() => {
      setTriggeredAction("");
    }, 3000);
  };

  const getCurrentQuote = () => {
    const quotes = currentMood.quotes;
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <Card className="p-4 bg-black/30 backdrop-blur-md border-orange-500/30 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-2xl">{currentMood.icon}</div>
        <h3 className="text-lg font-bold text-white">Mood Actions</h3>
        <Badge className={`bg-gradient-to-r ${currentMood.color} text-white`}>
          {currentEmotion}
        </Badge>
      </div>

      {/* Triggered Action Feedback */}
      {triggeredAction && (
        <Card className="p-3 bg-green-500/20 border-green-500/50 mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm font-semibold">Action Triggered!</span>
          </div>
          <p className="text-white text-sm mt-1">{triggeredAction}</p>
        </Card>
      )}

      {/* Action Suggestions */}
      <div className="space-y-3 mb-4">
        {currentMood.actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start bg-black/20 border-white/20 hover:bg-white/10 text-white hover:text-white transition-all"
            onClick={() => handleActionClick(action)}
          >
            <action.icon className="w-4 h-4 mr-3 text-cyan-400" />
            <div className="text-left">
              <div className="font-semibold">{action.label}</div>
              <div className="text-xs text-gray-300">{action.desc}</div>
            </div>
          </Button>
        ))}
      </div>

      {/* Motivational Quote */}
      <Card className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
        <div className="text-center">
          <div className="text-sm text-purple-300 mb-1">💭 Mood Quote</div>
          <p className="text-white italic text-sm">{getCurrentQuote()}</p>
        </div>
      </Card>

      {/* Auto Actions Log */}
      {autoActions.length > 0 && (
        <div className="mt-4">
          <div className="text-xs text-gray-400 mb-2">Auto-triggered actions:</div>
          {autoActions.map((action, index) => (
            <div key={index} className="text-xs text-cyan-300 bg-black/20 p-2 rounded mb-1">
              • {action}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default MoodActions;
