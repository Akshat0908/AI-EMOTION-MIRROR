
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Palette, Sparkles, Eye, Smile } from "lucide-react";

interface AvatarCustomizerProps {
  currentStyle: string;
  onStyleChange: (style: string) => void;
}

const AvatarCustomizer = ({ currentStyle, onStyleChange }: AvatarCustomizerProps) => {
  const avatarStyles = [
    {
      id: "cartoon",
      name: "Cartoon",
      icon: "😊",
      description: "Classic emoji-style expressions",
      color: "from-yellow-400 to-orange-400"
    },
    {
      id: "anime", 
      name: "Anime",
      icon: "^_^",
      description: "Japanese manga-inspired faces",
      color: "from-pink-400 to-purple-400"
    },
    {
      id: "realistic",
      name: "Realistic",
      icon: "😄",
      description: "Human-like emotional expressions",
      color: "from-blue-400 to-cyan-400"
    },
    {
      id: "abstract",
      name: "Abstract",
      icon: "◉‿◉",
      description: "Geometric and artistic styles",
      color: "from-green-400 to-emerald-400"
    }
  ];

  const backgroundStyles = [
    "Gradient Flow",
    "Particle Storm", 
    "Color Waves",
    "Mood Bubbles",
    "Energy Field"
  ];

  const animationTypes = [
    "Smooth Transitions",
    "Bouncy Energy",
    "Pulsing Rhythm",
    "Floating Motion",
    "Dynamic Scaling"
  ];

  return (
    <Card className="p-4 bg-black/30 backdrop-blur-md border-pink-500/30 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-pink-400" />
        <h3 className="text-lg font-bold text-white">Avatar Customizer</h3>
        <Badge className="bg-gradient-to-r from-pink-500 to-purple-500">
          Personalize
        </Badge>
      </div>

      {/* Avatar Style Selection */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Smile className="w-4 h-4 text-cyan-400" />
          <span className="text-white font-semibold">Expression Style</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {avatarStyles.map((style) => (
            <Button
              key={style.id}
              variant={currentStyle === style.id ? "default" : "outline"}
              className={`p-4 h-auto flex flex-col items-center gap-2 ${
                currentStyle === style.id 
                  ? `bg-gradient-to-r ${style.color} text-white border-none` 
                  : "bg-black/20 border-white/20 text-white hover:bg-white/10"
              }`}
              onClick={() => onStyleChange(style.id)}
            >
              <div className="text-2xl">{style.icon}</div>
              <div className="text-center">
                <div className="font-semibold text-sm">{style.name}</div>
                <div className="text-xs opacity-80">{style.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-4 bg-white/20" />

      {/* Background Customization */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-white font-semibold">Background Effects</span>
        </div>
        <div className="space-y-2">
          {backgroundStyles.map((bg, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="w-full justify-start bg-black/20 border-white/20 text-white hover:bg-white/10"
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mr-3"></div>
              {bg}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-4 bg-white/20" />

      {/* Animation Settings */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4 text-green-400" />
          <span className="text-white font-semibold">Animation Style</span>
        </div>
        <div className="space-y-2">
          {animationTypes.map((animation, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="w-full justify-start bg-black/20 border-white/20 text-white hover:bg-white/10"
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 mr-3"></div>
              {animation}
            </Button>
          ))}
        </div>
      </div>

      {/* Current Settings Display */}
      <Card className="p-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/30">
        <div className="text-center">
          <div className="text-sm text-cyan-300 mb-1">🎨 Current Style</div>
          <div className="text-white font-semibold">
            {avatarStyles.find(s => s.id === currentStyle)?.name || "Custom"}
          </div>
          <div className="text-xs text-gray-300 mt-1">
            Personalized just for you!
          </div>
        </div>
      </Card>
    </Card>
  );
};

export default AvatarCustomizer;
