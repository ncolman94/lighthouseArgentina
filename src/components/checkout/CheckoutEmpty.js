import { Link } from "react-router-dom";

const CheckoutEmpty = () => {

    return <div>
        <p>
            <span>Aún no se han agregado productos.</span>
        </p>
        <Link to={'/home'} className="verProductos">Ver Productos</Link>
    </div>
};

export default CheckoutEmpty;