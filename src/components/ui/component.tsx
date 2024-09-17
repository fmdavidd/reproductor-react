import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Avatar, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Slider } from "./slider";

export default function Component() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (value[0] / 100) * duration;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#121212]">
      <div className="flex-1 overflow-auto p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Tu Biblioteca</h1>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-4 bg-[#1e1e1e] p-3 rounded-lg">
              <Avatar>
                <AvatarImage src={`/images/album${i}.jpg`} alt="Album cover" />
              </Avatar>
              <div className="flex-1">
                <h2 className="text-white font-semibold">Canción {i}</h2>
                <p className="text-[#b3b3b3] text-sm">Artista {i}</p>
              </div>
              <p className="text-[#b3b3b3] text-sm">3:45</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1e1e1e] p-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/images/now-playing.jpg" alt="Now playing" />
            </Avatar>
            <div>
              <h3 className="text-white font-semibold">Canción Actual</h3>
              <p className="text-[#b3b3b3] text-sm">Artista</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              size="icon"
              variant="ghost"
              className="bg-gray-800 rounded-full p-3 text-white hover:bg-gray-700"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
                }
              }}
            >
              <SkipBack className="h-3 w-3" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="bg-gray-800 rounded-full p-3 text-white hover:bg-gray-700"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="bg-gray-800 rounded-full p-3 text-white hover:bg-gray-700"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
                }
              }}
            >
              <SkipForward className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Volume2 className="text-[#b3b3b3] h-5 w-5" />
            <Slider
              className="w-24"
              defaultValue={[volume]}
              max={100}
              step={1}
              value={[volume]}
              onChange={handleVolumeChange}
            />
          </div>
        </div>

        <Slider
          className="mt-4 w-full"
          defaultValue={[0]}
          max={100}
          step={1}
          value={[currentTime / duration * 100]}
          onChange={handleProgressChange}
        />
      </div>

      <audio
        ref={audioRef}
        src="/music/song1.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>
    </div>
  );
}
