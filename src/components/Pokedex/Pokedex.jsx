import PokemonList from "../PokemonList/PokemonList"
import Search from "../Search/Search"
import './Pokedex.css'

function Pokedex(params) {
    return(
        <div className="pokedex-wrapper">
         <h1 id="pokemon-header">Pokedex</h1>
         <Search/>
         <PokemonList/> 
        </div>
    )
}

export default Pokedex