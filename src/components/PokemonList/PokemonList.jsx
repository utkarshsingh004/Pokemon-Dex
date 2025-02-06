import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import Search from "../Search/Search";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [pokedex, setPokedex] = useState("https://pokeapi.co/api/v2/pokemon/");

  useEffect(() => {
    async function downloadPokemons() {
      setIsLoading(true);
      try {
        const response = await axios.get(pokedex); // Get list of 20 Pokémon
        const pokemonResult = response.data.results; // Extract Pokémon array

        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        // Fetch details for each Pokémon
        const pokemonData = await Promise.all(
          pokemonResult.map((pokemon) => axios.get(pokemon.url))
        );

        // Transform response data
        const res = pokemonData.map((pokeData) => {
          const pokemon = pokeData.data;
          return {
            id: pokemon.id,
            name: pokemon.name,
            image:
              pokemon.sprites.other?.dream_world?.front_default ||
              pokemon.sprites.front_default, // Safe fallback
            types: pokemon.types.map((t) => t.type.name), // Extract type names
          };
        });

        setPokemonList(res);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setIsLoading(false);
      }
    }

    downloadPokemons();
  }, [pokedex]); // Runs when `pokedex` URL changes

  return (
    <>
      <Search arr={pokemonList} />
      <div className="pokemon-list-wrapper">Pokemon List</div>
      <div className="data-loading">
        {isLoading ? (
          "Loading..."
        ) : (
          pokemonList.map((p) => (
            <Pokemon name={p.name} image={p.image} key={p.id} about={p.types} />
          ))
        )}
      </div>
      <div className="controls">
        <button disabled={!prevUrl} onClick={() => prevUrl && setPokedex(prevUrl)}>
          Previous
        </button>
        <button disabled={!nextUrl} onClick={() => nextUrl && setPokedex(nextUrl)}>
          Next
        </button>
      </div>
    </>
  );
}

export default PokemonList;
