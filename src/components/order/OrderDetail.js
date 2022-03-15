import ProductoCarrito from "../producto/ProductoCarrito";

const OrderDetail = ({ orderId, order }) => {
  return (
    <div>
      <p>
        Hola <strong>{order.buyer.name}</strong>
      </p>
      <h2 className="orderID">
        {orderId}
        <span>
          {" "}
          / {order.state} {order.date}
        </span>
      </h2>
      <div className="productos">
        <div className="items">
          {order.items.map((product) => (
            <ProductoCarrito key={product.name} product={product} />
          ))}
          <div className="clear"></div>
        </div>
        <div className="totalCarrito">
          <p>Total: $ {order.total}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
