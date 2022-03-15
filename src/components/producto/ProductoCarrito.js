import "./Producto.css";
import "./ProductoCarrito.css";

import { CartContext } from "../../context/CartContext";
import ItemCount from "./ItemCount";
import { Link } from "react-router-dom";
import { useContext } from "react";

const ProductoCarrito = ({ product, onChangeFn }) => {
  const { removeItem } = useContext(CartContext);

  const removeProduct = () => {
    removeItem(product.id);
  };

  const onChange = (units) => {
    onChangeFn(product, units);
  };

  return (
    <div className="productoCarrito">
      <div className="thumb">
        <Link to={"/item/" + product.id} className="viewDetail">
          <img src={product.image} title={product.name} alt={product.nombre} />
        </Link>
      </div>
      <div className="info">
        <div className="titulo">{product.name}</div>
        <div className="detalle">{product.categoryName}</div>
      </div>
      <div className="precio">
        <div>Precio Unitario</div>
        <div>AR$ {product.price}</div>
      </div>
      <div className={onChangeFn ? "cantidad" : "cantidad detalleOrden"}>
        <div>Cantidad</div>
        {onChangeFn ? (
          <ItemCount
            stock={product.stock}
            initial={product.quantity}
            onChange={onChange}
          />
        ) : (
          product.quantity
        )}
      </div>
      <div className={onChangeFn ? "subtotal" : "subtotal detalleOrden"}>
        <div>SubTotal</div>
        <div>$ {product.price * product.quantity}</div>
      </div>
      {onChangeFn && (
        <div className="accion">
          <button className="quitarProducto" onClick={removeProduct}>
            Quitar
          </button>
        </div>
      )}
      <div className="clear"></div>
    </div>
  );
};

export default ProductoCarrito;
