import "./Cart.css";

import { Cart } from "react-bootstrap-icons";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

const CartWidget = () => {
  const { cartInfo, getQuantity } = useContext(CartContext);

  return (
    <Link to="/cart">
      <Cart title="Carrito" alt="Carrito" width="48" />
      {cartInfo.length > 0 && <span>{getQuantity()}</span>}
    </Link>
  );
};

export default CartWidget;
