import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Pokedex from './components/Pokedex/Pokedex';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page with Pokedex */}
        <Route path="/" element={<Pokedex />} />

        {/* Dynamic Route for Pokemon Detail Page */}
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
