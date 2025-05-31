
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageCircle, Sparkles } from "lucide-react";

interface ConversationalAIProps {
  currentEmotion: string;
  speechText: string;
  speechSentiment: string;
  voiceTone: string;
  onResponseGenerated: (response: string) => void;
}

const ConversationalAI = ({
  currentEmotion,
  speechText,
  speechSentiment,
  voiceTone,
  onResponseGenerated
}: ConversationalAIProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{text: string, type: 'user' | 'ai', timestamp: number}>>([]);
  const [currentResponse, setCurrentResponse] = useState("");

  const contextAwareResponses = {
    happy: {
      high: [
        "Your joy is absolutely radiant! I can feel your positive energy from here! ✨",
        "This level of happiness is incredible! What's making you feel so amazing?",
        "You're glowing with pure joy! Share this wonderful energy with the world! 🌟"
      ],
      medium: [
        "I love seeing you smile! Your happiness brightens my circuits! 😊",
        "That's a beautiful expression of joy! Keep that energy flowing!",
        "Your positive vibes are contagious! Tell me what's bringing you joy!"
      ],
      low: [
        "I can see a gentle happiness in your expression. That's lovely!",
        "There's a peaceful contentment in your mood. How nice!",
        "A subtle smile speaks volumes. What's bringing you this quiet joy?"
      ]
    },
    sad: {
      high: [
        "I can see you're going through something difficult. I'm here with you. 💙",
        "Your emotions are valid and important. Take all the time you need.",
        "Sometimes we need to feel deeply to heal. You're not alone in this."
      ],
      medium: [
        "I sense some sadness. Would you like to talk about what's on your mind?",
        "It's okay to have these moments. I'm here to listen if you need.",
        "Your feelings matter. Take a moment to breathe and be gentle with yourself."
      ],
      low: [
        "I notice a touch of melancholy. Sometimes that's just how we feel.",
        "There's a quiet sadness in your expression. That's perfectly human.",
        "Even small sadness deserves acknowledgment. You're doing okay."
      ]
    },
    angry: {
      high: [
        "I can feel your intense emotions! Let's channel this energy constructively. 🔥",
        "Strong feelings deserve respect. What's driving this passion?",
        "Your emotions are powerful! Take deep breaths with me - in and out."
      ],
      medium: [
        "I see you're feeling frustrated. That's completely understandable.",
        "Strong emotions can be overwhelming. Let's work through this together.",
        "Your feelings are valid. What would help you feel better right now?"
      ],
      low: [
        "I notice some irritation. Sometimes that's just how the day goes.",
        "A little frustration is normal. You're handling it well.",
        "I can sense some tension. Would a moment of calm help?"
      ]
    },
    surprised: {
      high: [
        "Whoa! Something really caught your attention! Tell me everything! 🎭",
        "That's amazing surprise on your face! What just happened?",
        "You look absolutely astonished! I'm curious about what surprised you!"
      ],
      medium: [
        "Something unexpected happened! I love seeing your sense of wonder!",
        "That's a great expression of surprise! What caught you off guard?",
        "Your eyes just lit up! What wonderful thing are you discovering?"
      ],
      low: [
        "I see a hint of surprise in your expression. Something interesting?",
        "There's curiosity in your look. What's capturing your attention?",
        "A gentle surprise - those are often the most delightful!"
      ]
    },
    fear: {
      high: [
        "I can sense your worry. You're safe here with me. Let's breathe together. 🛡️",
        "Fear can be overwhelming, but you're stronger than you know.",
        "I'm here to help you feel grounded. You're safe and you're okay."
      ],
      medium: [
        "I notice some anxiety. That's completely normal and understandable.",
        "Feeling uncertain is part of being human. You're handling it well.",
        "A little worry is okay. Let's focus on what you can control."
      ],
      low: [
        "I sense some concern. Sometimes caution is wisdom.",
        "There's thoughtfulness in your expression. That's good awareness.",
        "A touch of apprehension is natural. You're being mindful."
      ]
    },
    neutral: {
      high: [
        "Perfect emotional balance! You're in a wonderful state of zen. ⚖️",
        "I admire your calm composure. There's wisdom in this equilibrium.",
        "Such peaceful energy! You're modeling beautiful emotional stability."
      ],
      medium: [
        "You're in a nice, balanced state. There's beauty in this calm.",
        "I appreciate your steady presence. It's very grounding.",
        "Your balanced energy is quite centering. Thank you for that."
      ],
      low: [
        "A gentle neutrality - sometimes that's exactly what we need.",
        "You're in a peaceful space. That can be very restorative.",
        "Quiet moments like this have their own special value."
      ]
    }
  };

  const generateContextualResponse = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const intensityLevel = emotionIntensity > 0.7 ? 'high' : emotionIntensity > 0.4 ? 'medium' : 'low';
      const emotionResponses = contextAwareResponses[currentEmotion as keyof typeof contextAwareResponses] || contextAwareResponses.neutral;
      const responses = emotionResponses[intensityLevel as keyof typeof emotionResponses];
      
      let response = responses[Math.floor(Math.random() * responses.length)];

      // Add speech context if available
      if (speechText && speechText.length > 10) {
        const speechAddons = [
          ` I heard you mention "${speechText.slice(0, 30)}..." - that sounds important!`,
          ` Your words about "${speechText.slice(0, 25)}..." really resonated with me.`,
          ` The way you expressed "${speechText.slice(0, 30)}..." shows your ${currentEmotion} clearly.`
        ];
        response += speechAddons[Math.floor(Math.random() * speechAddons.length)];
      }

      // Add voice tone context
      if (voiceTone && voiceTone !== "neutral") {
        response += ` I can hear the ${voiceTone} tone in your voice too.`;
      }

      setCurrentResponse(response);
      onResponseGenerated(response);
      
      // Add to conversation history with explicit typing
      setConversationHistory(prev => [...prev, {
        text: response,
        type: 'ai' as const,
        timestamp: Date.now()
      }].slice(-10)); // Keep last 10 exchanges
      
      setIsGenerating(false);
    }, 1000 + Math.random() * 2000); // Simulate AI thinking time
  };

  const emotionIntensity = 0.5; // This would come from props in real implementation

  useEffect(() => {
    if (currentEmotion || speechText) {
      generateContextualResponse();
    }
  }, [currentEmotion, speechText, speechSentiment, voiceTone]);

  useEffect(() => {
    if (speechText && speechText.length > 5) {
      setConversationHistory(prev => [...prev, {
        text: speechText,
        type: 'user' as const,
        timestamp: Date.now()
      }].slice(-10));
    }
  }, [speechText]);

  return (
    <Card className="p-4 bg-black/30 backdrop-blur-md border-green-500/30 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-bold text-white">AI Conversation</h3>
        </div>
        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500">
          Context Aware
        </Badge>
      </div>

      {/* Current AI Response */}
      {isGenerating ? (
        <Card className="p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/30 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-cyan-400 animate-spin" />
            <span className="text-cyan-400 text-sm">AI is thinking...</span>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </Card>
      ) : currentResponse && (
        <Card className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-semibold">AI Response</span>
          </div>
          <p className="text-white italic text-sm leading-relaxed">"{currentResponse}"</p>
        </Card>
      )}

      {/* Conversation History */}
      {conversationHistory.length > 0 && (
        <div className="space-y-2 max-h-40 overflow-y-auto">
          <div className="text-xs text-gray-400 mb-2">Recent conversation:</div>
          {conversationHistory.slice(-4).map((entry, index) => (
            <div key={index} className={`text-xs p-2 rounded ${
              entry.type === 'user' 
                ? 'bg-blue-500/20 text-blue-200 ml-4' 
                : 'bg-green-500/20 text-green-200 mr-4'
            }`}>
              <div className="font-semibold mb-1">
                {entry.type === 'user' ? '👤 You' : '🤖 AI'}
              </div>
              <div>"{entry.text}"</div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ConversationalAI;
