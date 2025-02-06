import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextUrl, setNextUrl]=useState('');
  const [prevUrl, setPrevUrl]=useState('');

  const [pokedex, setPokedex]=useState("https://pokeapi.co/api/v2/pokemon/")

  async function downloadPokemons() {
    setIsLoading(true);

    try {
      const response = await axios.get(pokedex); // this downloads list of 20 pokemons
      const pokemonResult = response.data.results; //we get the array of pokemons from result


      setNextUrl(response.data.next)
      setPrevUrl(response.data.previous)

      //iterating over the array of pokemmons,  and using their url,  to create an array of promises that will downlaod those pokemons
      const pokemonResultPromise = pokemonResult.map((pokemon) =>
        axios.get(pokemon.url)
      );


      //passing the promise array to axios.all
      const pokemonData = await axios.all (pokemonResultPromise); // arrao of 20 pokemon detailed data


      //now iterate on the data of each pokemon, and extract id, name, image and types
      const res = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image:
            pokemon.sprites.other?.dream_world?.front_default ||
            pokemon.sprites.front_default, // Corrected fallback
          types: pokemon.types,
        };
      });

      setPokemonList(res);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokedex]);

  return (
    <>
     <div className="pokemon-list-wrapper">
      Pokemon List
    </div>
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
    <button disabled={prevUrl==null} onClick={()=>setPokedex(prevUrl)}>Previous</button>
    <button disabled={nextUrl==null} onClick={()=>setPokedex(nextUrl)}>Next</button>
  </div>
    </>
  );
}

export default PokemonList;
