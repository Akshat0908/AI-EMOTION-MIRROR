
import { useEffect, useRef } from "react";

interface AISpeechSynthesizerProps {
  text: string;
  emotion: string;
  isEnabled: boolean;
}

const AISpeechSynthesizer = ({ text, emotion, isEnabled }: AISpeechSynthesizerProps) => {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const getVoiceParameters = (emotion: string) => {
    const voiceConfigs = {
      happy: { rate: 1.1, pitch: 1.3, volume: 0.8 },
      sad: { rate: 0.8, pitch: 0.7, volume: 0.6 },
      angry: { rate: 1.2, pitch: 0.9, volume: 0.9 },
      surprised: { rate: 1.3, pitch: 1.4, volume: 0.8 },
      fear: { rate: 1.1, pitch: 1.2, volume: 0.5 },
      disgust: { rate: 0.9, pitch: 0.8, volume: 0.7 },
      neutral: { rate: 1.0, pitch: 1.0, volume: 0.7 }
    };

    return voiceConfigs[emotion as keyof typeof voiceConfigs] || voiceConfigs.neutral;
  };

  const speakWithEmotion = (text: string, emotion: string) => {
    if (!isEnabled || !text || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voiceParams = getVoiceParameters(emotion);

    utterance.rate = voiceParams.rate;
    utterance.pitch = voiceParams.pitch;
    utterance.volume = voiceParams.volume;

    // Try to use a more natural voice
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.name.includes('Samantha') ||
      voice.name.includes('Alex')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (text && emotion) {
      speakWithEmotion(text, emotion);
    }

    return () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, [text, emotion, isEnabled]);

  return null;
};

export default AISpeechSynthesizer;
