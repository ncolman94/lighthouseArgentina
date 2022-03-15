import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext';
import ProductoCarrito from '../producto/ProductoCarrito';

const CartDetail = ({ onChangeFn }) => {
    const { cartInfo, totalAmount, clear } = useContext(CartContext);

    return <div>
        <div className="productos">
            <div className="items">
                {cartInfo.map((product) =>
                    <ProductoCarrito key={product.id} product={product} onChangeFn={onChangeFn} />
                )}
                <div className="clear"></div>
            </div>
            <div className="totalCarrito">
                {totalAmount > 0 && <p>Total: AR$ {totalAmount}</p>}
            </div>
        </div>                <div>
            <button className="limpiarCarrito" onClick={clear}>Vaciar Carrito</button>
            <Link to={'/checkout'} className="terminarCompra">Terminar mi Compra</Link>
        </div>
    </div>;
};

export default CartDetail;
