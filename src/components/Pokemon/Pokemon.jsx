import { useNavigate } from 'react-router-dom';
import './pokemon.css';

function Pokemon({ name, image, types }) {
    const navigate = useNavigate();

    return (
        <div className='pokemon'>
            <div className='pokemonName'>{name}</div>
            <div>
                <img 
                    src={image} 
                    alt={name} 
                    onClick={() => navigate(`/pokemon/${name}`, { state: { name, image, types } })} 
                    style={{ cursor: 'pointer' }} 
                />
            </div>
        </div>
    );
}

export default Pokemon;
