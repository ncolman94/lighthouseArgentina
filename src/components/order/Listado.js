import NotFound from '../not-found/NotFound';
import OrderListItem from './OrderListItem';

const Listado = ({ orders }) => {

    return <div>
        {orders.length > 0 && orders.map((orden) => (
            <OrderListItem key={orden.id} orderId={orden.id} order={orden} />
        ))}
        {orders.length === 0 &&
            <NotFound from="ord" />}
    </div>;
};

export default Listado;
