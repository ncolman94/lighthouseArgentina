import "./Cart.css";

import { useContext, useEffect } from "react";

import { CartContext } from "../../context/CartContext";
import CartDetail from "./CartDetail";
import CartEmpty from "./CartEmpty";

const Cart = () => {
  const { cartInfo, addItem, getTotalAmount } = useContext(CartContext);

  useEffect(() => {
    getTotalAmount();
  }, [cartInfo]);

  const onChange = (product, units) => {
    addItem(product, units);
    getTotalAmount();
  };

  return (
    <div className="detalleCarrito">
      <h1>CARRITO</h1>
      {cartInfo.length === 0 ? (
        <CartEmpty />
      ) : (
        <CartDetail onChangeFn={onChange} />
      )}
    </div>
  );
};

export default Cart;
