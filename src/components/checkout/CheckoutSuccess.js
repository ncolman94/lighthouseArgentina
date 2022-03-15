import { Link } from "react-router-dom";

const CheckoutSuccess = ({ message, orderID }) => {

    return <div>
        <div className="totalCarrito">
            <p>{message} <br /> {orderID}</p>
        </div>
        <Link to={'/home'} className="verProductos">Continuar Navegando</Link>
    </div>
};

export default CheckoutSuccess;