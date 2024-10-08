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
  const [selectedSong, setSelectedSong] = useState<number | null>(null); // Estado para la canción seleccionada
  const [songSrc, setSongSrc] = useState<string | null>(null); // Estado para la URL de la canción

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

  const handleSongClick = (songId: number, songPath: string) => {
    setSelectedSong(songId); // Cambiar la canción seleccionada
    setSongSrc(songPath); // Cambiar la canción que se reproduce
    setCurrentTime(0); // Reiniciar la posición del tiempo
    setIsPlaying(false); // Pausar la reproducción antes de iniciar la nueva canción

    if (audioRef.current) {
      audioRef.current.pause(); // Pausar la canción actual
      audioRef.current.src = songPath; // Cambiar la fuente de la canción
      audioRef.current.load(); // Cargar la nueva canción
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#121212]">
      {/* Contenido de la lista de canciones */}
      {selectedSong === null ? (
        <div className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold text-white mb-4">Tu Biblioteca</h1>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center space-x-4 bg-[#1e1e1e] p-3 rounded-lg cursor-pointer"
                onClick={() => handleSongClick(i, `/music/song${i}.mp3`)} // Asigna la canción correspondiente
              >
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
      ) : (
        <div className="flex-1 p-6">
          {/* Vista de detalle de la canción seleccionada */}
          <div className="flex items-center space-x-4 bg-[#1e1e1e] p-6 rounded-lg">
            <Avatar>
              <AvatarImage src={`/images/album${selectedSong}.jpg`} alt="Album cover" />
            </Avatar>
            <div className="flex-1">
              <h2 className="text-white font-semibold">Canción {selectedSong}</h2>
              <p className="text-[#b3b3b3] text-sm">Artista {selectedSong}</p>
            </div>
          </div>
          <button
            className="mt-6 bg-[#1e1e1e] text-white underline"
            onClick={() => setSelectedSong(null)} // Volver a la lista de canciones
          >
            Volver a la lista
          </button>

          {/* Cuadro con detalles de la canción */}
          <div className="bg-[#1e1e1e] mt-6 p-4 rounded-lg">
            <h3 className="text-white text-lg font-semibold">Detalles de la Canción</h3>
            <p className="text-[#b3b3b3] text-sm">Esta es la descripción o información adicional sobre la canción {selectedSong}. Puedes incluir cualquier dato adicional aquí.</p>
          </div>
          <div className="bg-[#1e1e1e] mt-6 p-4 rounded-lg">
            <h3 className="text-white text-lg font-semibold">Letra de canciòn</h3>
            <p className="text-[#b3b3b3] text-sm">Esta es la letra de {selectedSong}.</p>
          </div>
          <div className="bg-[#1e1e1e] mt-6 p-4 rounded-lg">
            <h3 className="text-white text-lg font-semibold">Oyentes Mensuales: 2.000.000</h3>
            <h3 className="text-white text-lg font-semibold">Reproducciones Totales: 10.000.000</h3>
          </div>
        </div>
      )}

      {/* Reproductor que permanece fijo en la parte inferior */}
      <div className="bg-[#1e1e1e] p-4 border-t border-gray-800 fixed bottom-0 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/images/now-playing.jpg" alt="Now playing" />
            </Avatar>
            <div>
              <h3 className="text-white font-semibold">
                {selectedSong !== null ? `Canción ${selectedSong}` : "Selecciona una canción"}
              </h3>
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
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        autoPlay
      ></audio>
    </div>
  );
}
