
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image, Download, Sparkles, Palette } from "lucide-react";

interface AIImageGeneratorProps {
  currentEmotion: string;
  intensity: number;
}

const AIImageGenerator = ({ currentEmotion, intensity }: AIImageGeneratorProps) => {
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Emotion-based art prompts
  const emotionArtPrompts = {
    happy: [
      "A vibrant sunflower field with golden rays of sunlight, digital art",
      "Colorful butterflies dancing in a magical garden, watercolor style",
      "Abstract burst of yellow and orange energy, contemporary art"
    ],
    sad: [
      "A gentle rain falling on a peaceful lake at twilight, impressionist style",
      "Melancholic blue waves under a cloudy sky, oil painting",
      "Abstract flowing tears transforming into silver streams, digital art"
    ],
    angry: [
      "Fierce red lightning bolts across a dramatic sky, digital art",
      "Abstract volcanic eruption with flowing lava patterns, contemporary art",
      "Dynamic red and black geometric shapes colliding, modern art"
    ],
    surprised: [
      "Explosion of colorful fireworks against a starry night, digital art",
      "Abstract burst of rainbow colors radiating outward, contemporary art",
      "Magical portal opening with swirling colors, fantasy art"
    ],
    fear: [
      "Mysterious fog rolling through ancient trees, atmospheric art",
      "Abstract dark clouds with silver linings, monochromatic art",
      "Gentle candlelight in darkness, realistic painting"
    ],
    neutral: [
      "Peaceful zen garden with smooth stones, minimalist art",
      "Calm ocean waves at sunset, landscape photography style",
      "Abstract balance of earth tones, contemporary art"
    ]
  };

  // Generate SVG art based on emotion (free alternative)
  const generateSVGArt = () => {
    const emotion = currentEmotion as keyof typeof emotionArtPrompts;
    const colors = {
      happy: ['#FFD700', '#FF6B35', '#F7931E'],
      sad: ['#4A90E2', '#7B68EE', '#87CEEB'],
      angry: ['#DC143C', '#FF4500', '#B22222'],
      surprised: ['#FF69B4', '#9370DB', '#FF1493'],
      fear: ['#2F4F4F', '#696969', '#708090'],
      neutral: ['#8FBC8F', '#CD853F', '#DEB887']
    };

    const emotionColors = colors[emotion] || colors.neutral;
    const size = 200;
    const numShapes = Math.floor(5 + intensity * 10);

    let shapes = '';
    for (let i = 0; i < numShapes; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const radius = 10 + Math.random() * 30;
      const color = emotionColors[Math.floor(Math.random() * emotionColors.length)];
      const opacity = 0.3 + Math.random() * 0.7;
      
      if (emotion === 'angry') {
        // Sharp triangles for anger
        const points = `${x},${y} ${x + radius},${y + radius} ${x - radius},${y + radius}`;
        shapes += `<polygon points="${points}" fill="${color}" opacity="${opacity}" />`;
      } else if (emotion === 'happy') {
        // Bright circles for happiness
        shapes += `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" opacity="${opacity}" />`;
      } else if (emotion === 'sad') {
        // Flowing ellipses for sadness
        shapes += `<ellipse cx="${x}" cy="${y}" rx="${radius}" ry="${radius * 1.5}" fill="${color}" opacity="${opacity}" />`;
      } else {
        // Default circles
        shapes += `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" opacity="${opacity}" />`;
      }
    }

    const svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${emotionColors[0]};stop-opacity:0.2" />
            <stop offset="100%" style="stop-color:${emotionColors[1]};stop-opacity:0.1" />
          </linearGradient>
        </defs>
        <g filter="url(#blur)">
          ${shapes}
        </g>
      </svg>
    `;

    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  // Generate ASCII art based on emotion
  const generateASCIIArt = () => {
    const asciiPatterns = {
      happy: [
        "  ☀️ ✨ ☀️  ",
        " ✨ 😊 ✨ ",
        "☀️ ✨ ☀️  ",
        "  🌟 🌈 🌟  "
      ],
      sad: [
        "  ☔ 💧 ☔  ",
        " 💧 😢 💧 ",
        "☔ 💧 ☔  ",
        "  🌧️ 🌊 🌧️  "
      ],
      angry: [
        "  🔥 ⚡ 🔥  ",
        " ⚡ 😠 ⚡ ",
        "🔥 ⚡ 🔥  ",
        "  💥 🌋 💥  "
      ],
      surprised: [
        "  ✨ 🎭 ✨  ",
        " 🎭 😮 🎭 ",
        "✨ 🎭 ✨  ",
        "  🎪 🎨 🎪  "
      ],
      fear: [
        "  🌫️ 👻 🌫️  ",
        " 👻 😨 👻 ",
        "🌫️ 👻 🌫️  ",
        "  🕸️ 🦇 🕸️  "
      ],
      neutral: [
        "  🔮 ⚖️ 🔮  ",
        " ⚖️ 😐 ⚖️ ",
        "🔮 ⚖️ 🔮  ",
        "  🧘 🕯️ 🧘  "
      ]
    };

    const pattern = asciiPatterns[currentEmotion as keyof typeof asciiPatterns] || asciiPatterns.neutral;
    return pattern.join('\n');
  };

  // Generate art (combines SVG and ASCII)
  const generateArt = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const svgImage = generateSVGArt();
      setGeneratedImages(prev => [svgImage, ...prev].slice(0, 6));
      setIsGenerating(false);
    }, 1000);
  };

  // Download image
  const downloadImage = (imageSrc: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `emotion-art-${currentEmotion}-${index}.svg`;
    link.click();
  };

  // Get free AI image service links
  const openAIImageService = (service: string) => {
    const prompt = `${currentEmotion} emotion abstract art`;
    const urls = {
      craiyon: `https://www.craiyon.com/?prompt=${encodeURIComponent(prompt)}`,
      lexica: `https://lexica.art/?q=${encodeURIComponent(prompt)}`,
      playground: `https://playgroundai.com/create?prompt=${encodeURIComponent(prompt)}`,
      dreamstudio: `https://beta.dreamstudio.ai/generate?prompt=${encodeURIComponent(prompt)}`
    };
    
    window.open(urls[service as keyof typeof urls], '_blank');
  };

  return (
    <Card className="p-4 bg-black/30 backdrop-blur-md border-pink-500/30 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Image className="w-5 h-5 text-pink-400" />
          <h3 className="text-lg font-bold text-white">AI Art Generator</h3>
        </div>
        <Badge className="bg-gradient-to-r from-pink-500 to-purple-500">
          {currentEmotion}
        </Badge>
      </div>

      {/* Generate Art Button */}
      <Button
        onClick={generateArt}
        disabled={isGenerating}
        className="w-full mb-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
      >
        {isGenerating ? (
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 animate-spin" />
            Generating Art...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Generate {currentEmotion} Art
          </div>
        )}
      </Button>

      {/* ASCII Art Display */}
      <div className="mb-4 p-3 bg-black/20 rounded-lg">
        <div className="text-xs text-gray-300 mb-2">ASCII Emotion Art:</div>
        <pre className="text-center text-sm leading-relaxed">
          {generateASCIIArt()}
        </pre>
      </div>

      {/* Generated Images Grid */}
      {generatedImages.length > 0 && (
        <div className="mb-4">
          <div className="text-sm text-white mb-2">Generated Art:</div>
          <div className="grid grid-cols-2 gap-2">
            {generatedImages.slice(0, 4).map((image, index) => (
              <div key={index} className="relative group">
                <img 
                  src={image} 
                  alt={`Generated ${currentEmotion} art`}
                  className="w-full h-20 object-cover rounded-lg border border-pink-500/30"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadImage(image, index)}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                >
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Free AI Art Services */}
      <div>
        <div className="text-sm text-white mb-2">Free AI Art Services:</div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => openAIImageService('craiyon')}
            className="text-xs"
          >
            🎨 Craiyon
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => openAIImageService('lexica')}
            className="text-xs"
          >
            🖼️ Lexica
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => openAIImageService('playground')}
            className="text-xs"
          >
            🎮 Playground
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => openAIImageService('dreamstudio')}
            className="text-xs"
          >
            💭 DreamStudio
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIImageGenerator;
