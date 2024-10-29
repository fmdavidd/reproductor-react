// explorar.tsx
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react";
import { Avatar, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Slider } from "./slider";

// Definir el tipo para una canción
type Song = {
  id: number;
  title: string;
  artist: string;
  albumCover: string;
  duration: string;
  path: string;
};

// Lista de canciones de ejemplo
const songsList: Song[] = [
  { id: 1, title: "Canción 1", artist: "Artista 1", albumCover: "/images/album1.jpg", duration: "3:45", path: "/music/song1.mp3" },
  { id: 2, title: "Canción 2", artist: "Artista 2", albumCover: "/images/album2.jpg", duration: "3:45", path: "/music/song2.mp3" },
  { id: 3, title: "Canción 3", artist: "Artista 3", albumCover: "/images/album3.jpg", duration: "3:45", path: "/music/song3.mp3" },
  { id: 4, title: "Canción 4", artist: "Artista 4", albumCover: "/images/album4.jpg", duration: "3:45", path: "/music/song4.mp3" },
  { id: 5, title: "Canción 5", artist: "Artista 5", albumCover: "/images/album5.jpg", duration: "3:45", path: "/music/song5.mp3" },
];

export default function ExplorarComponent() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [selectedSong, setSelectedSong] = useState<number | null>(null);
  const [songSrc, setSongSrc] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    // Recuperar favoritos del localStorage
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    // Guardar favoritos en localStorage cuando cambien
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (songId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Evitar que se active el onClick del div padre
    setFavorites(prev => {
      if (prev.includes(songId)) {
        return prev.filter(id => id !== songId);
      } else {
        return [...prev, songId];
      }
    });
  };

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
    <div className="flex flex-col h-screen w-screen bg-[#121212] pt-16">
      {selectedSong === null ? (
        <div className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold text-white mb-4">Biblioteca</h1>
          <div className="space-y-4">
            {songsList.map((song) => (
              <div
                key={song.id}
                className="flex items-center space-x-4 bg-[#1e1e1e] p-3 rounded-lg cursor-pointer"
                onClick={() => handleSongClick(song.id, song.path)}
              >
                <Avatar>
                  <AvatarImage src={song.albumCover} alt="Album cover" />
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-white font-semibold">{song.title}</h2>
                  <p className="text-[#b3b3b3] text-sm">{song.artist}</p>
                </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex justify-center items-center text-white hover:text-white border-none bg-gray-800 border-none"
                    onClick={(e) => toggleFavorite(song.id, e)}
                  >
                    <Heart
                      className={favorites.includes(song.id) ? "fill-red-500 text-red-500" : ""}
                    />
                  </Button>

                <p className="text-[#b3b3b3] text-sm">{song.duration}</p>
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
        src={songSrc || ""}  // Aquí se usa songSrc
      ></audio>

    </div>
  );
}
