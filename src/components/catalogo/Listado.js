import NotFound from "../not-found/NotFound";
import Producto from "../producto/Producto";
import Row from "react-bootstrap/Row";

const Listado = ({ products }) => {
  return (
    <Row md={4}>
      {products.length > 0 &&
        products.map((product) => (
          <Producto key={product.id} product={product} />
        ))}
      {products.length === 0 && <NotFound from="cat" />}
    </Row>
  );
};

export default Listado;
