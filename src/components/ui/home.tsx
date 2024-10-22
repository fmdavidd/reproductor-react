import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-black overflow-hidden">
      <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-12 tracking-wide">
        Echowave el Lugar perfecto para Escuchar Música
      </h1>
      <div className="flex gap-6">
        <Link 
          to="/explorar" 
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
        >
          EXPLORAR
        </Link>
        <Link 
          to="/pdf" 
          className="px-8 py-3 bg-transparent hover:bg-purple-800 text-white font-semibold border-2 border-purple-600 rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
        >
          MANUAL
        </Link>
      </div>
    </div>
  );
}

export default Home;