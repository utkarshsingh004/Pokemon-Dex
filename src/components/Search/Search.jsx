import "./Search.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

function Search({ arr = [] }) {
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("arr received in Search:", arr); // Debugging log
    if (!Array.isArray(arr) || arr.length === 0) return;

    const formattedArray = arr.map((pokemon) => ({
      id: pokemon?.id || "Unknown ID",
      name: pokemon?.name?.toLowerCase() || "Unknown Name",
      image: pokemon?.image || "",
      types: pokemon?.types || [],
    }));

    console.log("Formatted Pokemon List:", formattedArray); // Debugging log
    setPokemonList(formattedArray);
  }, [arr]);

  const handleSearch = () => {
    const foundPokemon = pokemonList.find(
      (pokemon) => pokemon.name === searchTerm.toLowerCase()
    );

    if (foundPokemon) {
      navigate(`/pokemon/${foundPokemon.name}`, { state: foundPokemon });
    } else {
      alert("Pokemon not found!");
    }
  };

  return (
    <div className="search-wrapper">
      <input
        id="pokemon-name-search"
        type="text"
        placeholder="Pokemon name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />
      <FaSearch
        style={{
          marginLeft: "10px",
          cursor: "pointer",
          width: "50px",
          opacity: searchTerm ? 1 : 0.5,
        }}
        onClick={searchTerm ? handleSearch : null} // Prevent click if search is empty
      />
    </div>
  );
}

export default Search;
