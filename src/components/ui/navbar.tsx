import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white p-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Echowave</h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline text-white">Inicio</Link>
          <Link to="/explorar" className="hover:underline text-white">Explorar</Link>
          <Link to="/favoritos" className="hover:underline text-white">Favoritos</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
