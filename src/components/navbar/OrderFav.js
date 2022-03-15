import iconoFavorito from '../../img/iconoFavorito.png';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const OrderFav = () => {

    const { buyerInfo } = useContext(CartContext);
    return <>
        {buyerInfo.name === '' ?
            <li className="checkOrder">
                <NavLink to="/checkorder" className={({ isActive }) => (isActive ? 'current' : '')}>Ver Orden</NavLink>
            </li>
            : <>
                <li className="favoriteIcon">
                    <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'current' : '')}>
                        <img src={iconoFavorito} alt="Mis Favoritos" width="32" />
                    </NavLink>
                </li>
                <li className="checkOrder">
                    <NavLink to="/myorders" className={({ isActive }) => (isActive ? 'current' : '')}>Mis Ordenes</NavLink>
                </li>
            </>
        }
    </>

};

export default OrderFav;