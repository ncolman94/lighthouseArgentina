import { Link } from 'react-router-dom'

const CartEmpty = () => {
    return <div>
        <p>
            <span>Aún no se han agregado productos.</span>
        </p>
        <Link to={'/home'} className="verProductos">Ver Productos</Link>
    </div>;
};

export default CartEmpty;
