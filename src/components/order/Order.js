import './Order.css';
import { useState, useEffect } from "react";
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import OrderDetail from './OrderDetail';
import Loading from '../loading/Loading';
import OrderSearch from './OrderSearch';
import OrderNotFound from './OrderNotFound';
import { useParams } from 'react-router-dom';

const Order = () => {
    const { orderId } = useParams();

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        if (orderId) {
            setOrder([]);
            const db = getFirestore();
            const docRef = doc(db, 'orders', orderId);
            getDoc(docRef).then((orden) => {
                if (orden.exists()) {
                    setOrder(orden.data());
                }
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [orderId])

    if (!orderId)
        return (
            <OrderSearch />
        )

    if (loading)
        return (
            <Loading />
        )

    return <div className="detalleCarrito">
        <h1>MI ORDEN</h1>
        {order.length !== 0 ?
            <OrderDetail orderId={orderId} order={order} />
            : <OrderNotFound />}
    </div>
};

export default Order;
