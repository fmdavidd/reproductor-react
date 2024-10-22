// src/App.tsx
import Component from "./components/ui/component";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/ui/navbar";
import PdfViewer from "./components/ui/pdf";
import Home from "./components/ui/home";
import FavoritosComponent from "./components/ui/favoritos";
function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/explorar" element={<Component />} />
      <Route path="/favoritos" element={<FavoritosComponent />} />
      <Route path="/pdf" element={<PdfViewer />} />
    </Routes>
  </Router>
  );
}

export default App;
