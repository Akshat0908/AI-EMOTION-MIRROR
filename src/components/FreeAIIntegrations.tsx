
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Zap, MessageSquare, Heart, Sparkles } from "lucide-react";

interface FreeAIIntegrationsProps {
  currentEmotion: string;
  speechText: string;
  onAIResponse: (response: string, source: string) => void;
}

const FreeAIIntegrations = ({ currentEmotion, speechText, onAIResponse }: FreeAIIntegrationsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentService, setCurrentService] = useState<string>('');
  const [reactionHistory, setReactionHistory] = useState<string[]>([]);

  // Enhanced emotion-specific responses with better accuracy
  const enhancedEmotionResponses = {
    happy: {
      primary: [
        "Your radiant joy is absolutely infectious! ✨ Keep spreading that beautiful energy!",
        "I can feel your happiness from here! 🌟 What's making you feel so amazing today?",
        "You're glowing with pure joy! This kind of positivity can change the world!",
        "Your smile could light up the entire room! 😊 I love seeing you this happy!",
        "That level of happiness is incredible! Your energy is absolutely magnetic!"
      ],
      contextual: [
        "Your excitement is contagious! Tell me more about what's bringing you such joy!",
        "I'm genuinely thrilled to see you this happy! Your positive vibes are amazing!",
        "You seem to be having the best day ever! I'm so happy for you!"
      ],
      supportive: [
        "Keep that beautiful energy flowing! You deserve all this happiness!",
        "Your joy is a gift to everyone around you! Thank you for sharing it!",
        "This is what pure happiness looks like! I'm inspired by your energy!"
      ]
    },
    sad: {
      primary: [
        "I can see you're going through something difficult. I'm here with you. 💙",
        "Your feelings are completely valid. Take all the time you need to process.",
        "Sometimes we need to feel deeply to heal properly. You're not alone in this journey.",
        "I sense some heaviness in your heart. Would you like to talk about what's weighing on you?",
        "It's okay to have these moments. Sadness is part of being beautifully human."
      ],
      contextual: [
        "I'm here to listen without judgment. Your emotions matter deeply.",
        "Even in sadness, there's strength in feeling. You're incredibly brave.",
        "This feeling will pass, but for now, let yourself feel what you need to feel."
      ],
      supportive: [
        "You're stronger than you know, even when you don't feel it.",
        "Tomorrow is a new day with new possibilities. I believe in you.",
        "Healing isn't linear, and that's perfectly okay. Be gentle with yourself."
      ]
    },
    angry: {
      primary: [
        "I can feel the intensity of your emotions. Let's channel this powerful energy constructively. 🔥",
        "Your anger is valid - it shows you care deeply about something important.",
        "Strong emotions deserve respect. Take some deep breaths with me - in and out slowly.",
        "That's some fierce energy! What's driving this passionate response?",
        "I sense frustration building up. Let's work through this together, step by step."
      ],
      contextual: [
        "Anger often masks other feelings like hurt or disappointment. What's really going on?",
        "Your intensity shows how much you care. That's actually quite admirable.",
        "Let's find a way to express this energy that serves you better."
      ],
      supportive: [
        "You have every right to feel this way. Now let's find a positive outlet.",
        "This fire in you can be transformed into incredible motivation.",
        "Strong feelings mean you're passionate and alive. That's powerful."
      ]
    },
    surprised: {
      primary: [
        "Whoa! Something really caught your attention! 🎭 Tell me everything!",
        "That's amazing surprise written all over your face! What just happened?",
        "You look absolutely astonished! I'm so curious about what surprised you!",
        "Your eyes just lit up with wonder! I love seeing that spark of amazement!",
        "That's the look of someone who just discovered something incredible!"
      ],
      contextual: [
        "Life just threw you a curveball, didn't it? I love those unexpected moments!",
        "Your sense of wonder is beautiful! What's capturing your imagination?",
        "Surprise can be such a gift - it keeps life interesting and magical!"
      ],
      supportive: [
        "Embrace that feeling of wonder! It's what keeps us young at heart.",
        "The best surprises often lead to the most amazing discoveries!",
        "Your openness to surprise shows how alive and present you are!"
      ]
    },
    fear: {
      primary: [
        "I can sense your worry, and I want you to know you're safe here with me. 🛡️",
        "Fear can be overwhelming, but you're braver and stronger than you realize.",
        "I'm here to help you feel grounded. You're okay, and you're going to be okay.",
        "Uncertainty can be scary, but you don't have to face it alone.",
        "Your caution shows wisdom. Let's work through this worry together."
      ],
      contextual: [
        "What you're feeling is completely normal. Fear is often just love in disguise.",
        "Even the bravest people feel scared sometimes. Courage isn't absence of fear.",
        "Let's break down what's worrying you into smaller, manageable pieces."
      ],
      supportive: [
        "You've overcome challenges before, and you'll overcome this too.",
        "Focus on what you can control right now. You're more capable than you know.",
        "This feeling will pass. You're safe, you're strong, and you're not alone."
      ]
    },
    neutral: {
      primary: [
        "Perfect emotional balance! You're in a wonderful state of calm equilibrium. ⚖️",
        "I admire your peaceful composure. There's real wisdom in this kind of balance.",
        "Such serene energy! You're modeling beautiful emotional stability right now.",
        "You seem centered and grounded. That's actually quite powerful and rare.",
        "There's something beautifully zen about your current state of being."
      ],
      contextual: [
        "Sometimes the most profound moments happen in quiet neutrality.",
        "Your balanced energy is very grounding. Thank you for sharing that calm.",
        "In a world of chaos, your peaceful presence is truly refreshing."
      ],
      supportive: [
        "This kind of emotional balance is a skill many people wish they had.",
        "Your calm presence probably helps others feel more peaceful too.",
        "There's great strength in stillness and emotional equilibrium."
      ]
    }
  };

  // Context-aware response selection
  const selectBestResponse = (emotion: string) => {
    const responses = enhancedEmotionResponses[emotion as keyof typeof enhancedEmotionResponses] 
      || enhancedEmotionResponses.neutral;
    
    // Avoid repeating recent responses
    const availableResponses = [
      ...responses.primary,
      ...responses.contextual,
      ...responses.supportive
    ].filter(response => !reactionHistory.includes(response));
    
    if (availableResponses.length === 0) {
      // Reset history if we've used all responses
      setReactionHistory([]);
      return responses.primary[0];
    }
    
    // Prioritize primary responses, then contextual, then supportive
    const primaryAvailable = responses.primary.filter(r => !reactionHistory.includes(r));
    if (primaryAvailable.length > 0) {
      return primaryAvailable[Math.floor(Math.random() * primaryAvailable.length)];
    }
    
    const contextualAvailable = responses.contextual.filter(r => !reactionHistory.includes(r));
    if (contextualAvailable.length > 0) {
      return contextualAvailable[Math.floor(Math.random() * contextualAvailable.length)];
    }
    
    const supportiveAvailable = responses.supportive.filter(r => !reactionHistory.includes(r));
    return supportiveAvailable[Math.floor(Math.random() * supportiveAvailable.length)];
  };

  // Enhanced AI response with speech context
  const generateEnhancedResponse = (emotion: string) => {
    let response = selectBestResponse(emotion);
    
    // Add speech context if available
    if (speechText && speechText.length > 10) {
      const speechContext = [
        ` I heard you mention "${speechText.slice(0, 40)}..." - that sounds really important to you.`,
        ` Your words about "${speechText.slice(0, 35)}..." really resonate with me and show your ${emotion} clearly.`,
        ` The way you expressed "${speechText.slice(0, 30)}..." tells me so much about how you're feeling right now.`,
        ` I can hear the emotion in your voice when you said "${speechText.slice(0, 35)}..." - thank you for sharing that.`
      ];
      
      response += speechContext[Math.floor(Math.random() * speechContext.length)];
    }
    
    // Track this response to avoid repetition
    setReactionHistory(prev => [...prev, response].slice(-10));
    
    return response;
  };

  // Main AI processing function
  const processWithAI = async (triggerType: string = 'manual') => {
    setIsProcessing(true);
    setCurrentService('enhanced-ai');

    try {
      const response = generateEnhancedResponse(currentEmotion);
      onAIResponse(response, 'enhanced-ai');
    } catch (error) {
      console.error('AI processing error:', error);
      const fallback = `I can see you're feeling ${currentEmotion}. I'm here with you, and your emotions are completely valid.`;
      onAIResponse(fallback, 'fallback');
    } finally {
      setIsProcessing(false);
      setCurrentService('');
    }
  };

  // Auto-trigger enhanced AI response when emotion changes significantly
  useEffect(() => {
    if (currentEmotion && currentEmotion !== 'neutral') {
      processWithAI('auto');
    }
  }, [currentEmotion]);

  // Fun facts and mood support
  const funFacts = [
    "Did you know? Smiling releases endorphins that can actually improve your mood even if you weren't initially happy! 😊",
    "Fun fact: Your brain can't tell the difference between real and imagined experiences, so visualizing positive outcomes can genuinely help! 🧠",
    "Amazing fact: Humans can recognize over 10,000 different facial expressions! Your emotions are incredibly nuanced! 🎭",
    "Cool discovery: Laughter is contagious because of mirror neurons - your brain literally mirrors others' emotions! ✨",
    "Incredible fact: Your heart rhythm changes with different emotions, and positive emotions create more coherent heart patterns! ❤️"
  ];

  const provideFunFact = () => {
    const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
    onAIResponse(fact, 'fun-fact');
  };

  return (
    <Card className="p-4 bg-black/30 backdrop-blur-md border-cyan-500/30 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">AI Emotion Intelligence</h3>
        </div>
        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500">
          Enhanced
        </Badge>
      </div>

      {/* Enhanced AI Status */}
      <div className="mb-4">
        <div className={`p-3 rounded-lg border transition-all bg-green-500/10 border-green-500/30`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-400" />
              <div>
                <div className="text-white text-sm font-medium">Enhanced AI Reactions</div>
                <div className="text-xs text-gray-300">Context-aware emotional intelligence</div>
              </div>
            </div>
            <Button
              size="sm"
              variant="default"
              disabled={isProcessing}
              onClick={() => processWithAI('manual')}
              className="text-xs"
            >
              {isProcessing ? (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing
                </div>
              ) : (
                'Generate Response'
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Quick AI Actions */}
      <div className="space-y-3">
        <div className="text-xs text-gray-300 mb-2">Quick AI Actions:</div>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => processWithAI('mood-support')}
          disabled={isProcessing}
          className="w-full justify-start text-xs bg-black/20 border-pink-500/30 text-white hover:bg-pink-500/10"
        >
          <Heart className="w-3 h-3 mr-2 text-pink-400" />
          Personalized Mood Support
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={provideFunFact}
          className="w-full justify-start text-xs bg-black/20 border-yellow-500/30 text-white hover:bg-yellow-500/10"
        >
          <Zap className="w-3 h-3 mr-2 text-yellow-400" />
          Inspiring Fun Fact
        </Button>
      </div>

      {/* Current Emotion Insight */}
      <div className="mt-4 pt-4 border-t border-gray-600">
        <div className="text-xs text-gray-300 mb-2">Current Emotion Analysis:</div>
        <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium capitalize">{currentEmotion}</span>
            <MessageSquare className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xs text-purple-200">
            AI is ready to provide contextual emotional support and insights.
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FreeAIIntegrations;
