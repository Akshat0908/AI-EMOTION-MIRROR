
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Play, Pause, SkipForward, Volume2 } from "lucide-react";

interface EmotionToMusicProps {
  currentEmotion: string;
  intensity: number;
}

const EmotionToMusic = ({ currentEmotion, intensity }: EmotionToMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);

  // Free music recommendations based on emotion
  const emotionMusicMap = {
    happy: {
      genre: "Upbeat Pop",
      tempo: 120 + (intensity * 40),
      key: "C major",
      description: "Energetic and joyful",
      youtubeSearch: "happy upbeat music",
      spotifyGenre: "pop dance electronic"
    },
    sad: {
      genre: "Ambient/Downtempo", 
      tempo: 60 + (intensity * 20),
      key: "A minor",
      description: "Melancholic and reflective",
      youtubeSearch: "sad emotional music",
      spotifyGenre: "ambient sad indie"
    },
    angry: {
      genre: "Rock/Electronic",
      tempo: 140 + (intensity * 30),
      key: "E minor",
      description: "Intense and powerful",
      youtubeSearch: "intense rock music",
      spotifyGenre: "rock metal electronic"
    },
    surprised: {
      genre: "Experimental",
      tempo: 100 + (intensity * 50),
      key: "F# major",
      description: "Unexpected and dynamic",
      youtubeSearch: "experimental electronic music",
      spotifyGenre: "experimental electronic"
    },
    fear: {
      genre: "Dark Ambient",
      tempo: 70 + (intensity * 15),
      key: "D minor",
      description: "Atmospheric and suspenseful",
      youtubeSearch: "dark ambient music",
      spotifyGenre: "dark ambient horror"
    },
    neutral: {
      genre: "Lo-fi/Chill",
      tempo: 80 + (intensity * 20),
      key: "G major", 
      description: "Calm and balanced",
      youtubeSearch: "lofi chill music",
      spotifyGenre: "lofi chill jazz"
    }
  };

  const currentMood = emotionMusicMap[currentEmotion as keyof typeof emotionMusicMap] || emotionMusicMap.neutral;

  // Generate simple tones using Web Audio API (free!)
  const generateEmotionalTone = () => {
    if (audioContext && !isPlaying) {
      const osc = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Map emotion to frequency and wave type
      const emotionFrequencies = {
        happy: 440, // A4
        sad: 220,   // A3
        angry: 330, // E4
        surprised: 880, // A5
        fear: 165,  // E3
        neutral: 261.63 // C4
      };
      
      osc.frequency.setValueAtTime(
        emotionFrequencies[currentEmotion as keyof typeof emotionFrequencies] || 261.63, 
        audioContext.currentTime
      );
      
      // Different wave types for different emotions
      const waveTypes: { [key: string]: OscillatorType } = {
        happy: 'sawtooth',
        sad: 'sine', 
        angry: 'square',
        surprised: 'triangle',
        fear: 'sine',
        neutral: 'sine'
      };
      
      osc.type = waveTypes[currentEmotion] || 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1 * intensity, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
      
      osc.start(audioContext.currentTime);
      osc.stop(audioContext.currentTime + 2);
      
      setOscillator(osc);
      setIsPlaying(true);
      
      setTimeout(() => setIsPlaying(false), 2000);
    }
  };

  // Initialize Web Audio API
  useEffect(() => {
    if (!audioContext) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(ctx);
    }
  }, []);

  // Open music streaming services with search
  const openMusicService = (service: string) => {
    const searchQuery = encodeURIComponent(currentMood.youtubeSearch);
    const urls = {
      youtube: `https://www.youtube.com/results?search_query=${searchQuery}`,
      spotify: `https://open.spotify.com/search/${encodeURIComponent(currentMood.spotifyGenre)}`,
      soundcloud: `https://soundcloud.com/search?q=${searchQuery}`,
      bandcamp: `https://bandcamp.com/search?q=${searchQuery}`
    };
    
    window.open(urls[service as keyof typeof urls], '_blank');
  };

  return (
    <Card className="p-4 bg-black/30 backdrop-blur-md border-purple-500/30 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Music className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-bold text-white">Emotion Music</h3>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
          {currentMood.genre}
        </Badge>
      </div>

      {/* Current Mood Music Info */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-white font-semibold">{currentMood.genre}</div>
          <div className="text-purple-300 text-sm">{Math.round(currentMood.tempo)} BPM</div>
        </div>
        <div className="text-purple-200 text-sm mb-2">{currentMood.description}</div>
        <div className="text-xs text-purple-300">
          Key: {currentMood.key} | Intensity: {(intensity * 100).toFixed(0)}%
        </div>
      </div>

      {/* AI Generated Tone */}
      <div className="mb-4">
        <div className="text-white text-sm mb-2">AI Generated Tone:</div>
        <Button
          onClick={generateEmotionalTone}
          disabled={isPlaying || !audioContext}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
        >
          {isPlaying ? (
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 animate-pulse" />
              Playing Emotional Tone...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Generate {currentEmotion} Sound
            </div>
          )}
        </Button>
      </div>

      {/* Music Service Links */}
      <div>
        <div className="text-white text-sm mb-2">Find Music:</div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => openMusicService('youtube')}
            className="text-xs"
          >
            🎵 YouTube
          </Button>
          <Button
            size="sm"
            variant="outline" 
            onClick={() => openMusicService('spotify')}
            className="text-xs"
          >
            🎧 Spotify
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => openMusicService('soundcloud')}
            className="text-xs"
          >
            ☁️ SoundCloud
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => openMusicService('bandcamp')}
            className="text-xs"
          >
            🎸 Bandcamp
          </Button>
        </div>
      </div>

      {/* Music Visualization */}
      {isPlaying && (
        <div className="mt-4 flex justify-center">
          <div className="flex items-end gap-1 h-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-2 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-t animate-pulse"
                style={{
                  height: `${20 + Math.random() * 20}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default EmotionToMusic;
