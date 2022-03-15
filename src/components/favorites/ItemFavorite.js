import { Link } from "react-router-dom";
import FavoriteWidget from "./FavoriteWidget";

const ItemFavorite = ({ favorite }) => {

    return <div className="itemFavorito">
        <div className="thumb">
            <Link to={'/item/' + favorite.product.id} className="viewDetail">
                <img src={favorite.product.image} title={favorite.product.name} alt={favorite.product.nombre} />
            </Link>
        </div>
        <div className="info">
            <div className="titulo">{favorite.product.name}</div>
            <div className="detalle">{favorite.product.categoryName} - {favorite.product.country} - {favorite.product.year}</div>
        </div>
        <FavoriteWidget product={favorite} isFavoriteYet={true} />
    </div>;
};

export default ItemFavorite;
