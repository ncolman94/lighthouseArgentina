import './Favorite.css';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import ItemFavorite from './ItemFavorite';
import NotFound from '../not-found/NotFound';

const Favorites = () => {
    const { favorites } = useContext(CartContext);

    return <div className="catalogo">
        {favorites.length > 0 ?
            <>
                <h1>Mis Favoritos</h1>
                <div className="favoritesList">
                    {favorites.map((fav) => {
                        return (<ItemFavorite key={fav.idFav} favorite={fav} />)
                    })}
                </div>
                <div className="clear"></div>
            </>
            :
            <NotFound from="fav" />
        }
    </div>;
};

export default Favorites;
