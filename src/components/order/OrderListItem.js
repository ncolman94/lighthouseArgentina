import "./OrderListItem.css";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

const OrderListItem = ({ orderId, order }) => {
  const getTotalUnits = () => {
    let ret = 0;
    order.items.forEach((item) => {
      ret += item.quantity;
    });
    return ret;
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Orden</th>
          <th>Fecha</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Link to={"/checkorder/" + orderId}>
              <span>{orderId}</span>
            </Link>
          </td>
          <td>
            {order.state} <br />
            <span>{order.date}</span>
          </td>
          <td>
            {order.items.map((item) => {
              return (
                <img
                  key={orderId + "-" + item.name}
                  src={item.image}
                  title={item.name}
                  alt={item.name}
                  style={{ width: "200px" }}
                />
              );
            })}
          </td>
          <td>
            <span>{getTotalUnits()} unidades.</span>
          </td>
          <td>
            <span>AR$ {order.total}</span>
          </td>
          <td>
            <Link to={"/checkorder/" + orderId} className="viewDetail">
              <Button variant="dark">Ver Detalle</Button>
            </Link>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default OrderListItem;
