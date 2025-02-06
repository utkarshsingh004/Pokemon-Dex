import { useLocation } from 'react-router-dom';
import "./PokemonDetail.css";
import Search from "../Search/Search";

function PokemonDetail() {
  const location = useLocation();
  const { name, image ,types} = location.state || {}; // Get data from navigation state

  return (
    <>
    <Search className="search"/>
      <div className="container">
        <img src={image} alt={name} />
        <div className="detail">
            <div className="name">{name}</div>
            <div className="types">Detail will be provided soon...</div>
        </div>
      </div>
    </>
  );
}

export default PokemonDetail;
