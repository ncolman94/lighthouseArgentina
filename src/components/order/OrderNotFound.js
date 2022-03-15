import { Link } from "react-router-dom";

const OrderNotFound = () => {
    return <div>
        <p>NO se hallaron datos para la orden ingresada.</p>
        <Link to={'/home'} className="verProductos">Continuar Navegando</Link>
        <Link to={'/checkorder'} className="viewOrder">Nueva Búsqueda</Link>
    </div>
};

export default OrderNotFound;
