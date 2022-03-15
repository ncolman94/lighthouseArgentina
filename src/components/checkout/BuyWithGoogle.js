import { Link } from 'react-router-dom';
import './BuyWithGoogle.css';

const BuyWithGoogle = ({ buyerInfo }) => {

    return <div className="comprarComo">
        <p>Realizar mi Compra como</p>
        <p>
            <label>Nombre: </label>
            <span>{buyerInfo.name}</span></p>
        <p>
            <label>Correo: </label>
            <span>{buyerInfo.email}</span>
        </p>
        <Link to={'/logout-checkout'} className="seguirComprando">No soy yo. Cerrar Sesión</Link>
    </div>
}

export default BuyWithGoogle;