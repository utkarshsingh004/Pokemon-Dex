import './Search.css'

function Search(params) {
    return(
        <div className="search-wrapper">
         <input 
         id='pokemon-name-search'
         type="text" 
         placeholder="Pokemon name..."
         />
        </div>
    )
}

export default Search