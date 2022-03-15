import { useState } from "react";
import { Link } from "react-router-dom";

const OrderSearch = () => {
    const [searchOrder, setSearchOrder] = useState('');

    return <div className="detalleCarrito">
        <h2 className="orderID">Por favor, ingrese el código de su Orden</h2>
        <input type="text" name="orderID" value={searchOrder} id="orderID" onChange={(e) => setSearchOrder(e.target.value)} />
        <p>Ejemplo: wx2H8bZNe2hYZojdtEMs</p>
        <Link to={'/checkorder/' + searchOrder} className="viewOrder">Ver Detalle</Link>
    </div>
};

export default OrderSearch;
