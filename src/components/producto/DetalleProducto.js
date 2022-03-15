import { useEffect, useState } from 'react';
import Producto from '../producto/Producto';
import { useParams } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import NotFound from '../not-found/NotFound';
import Loading from '../loading/Loading';

const DetalleProducto = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        if (id) {
            const db = getFirestore();

            const docRef = doc(db, 'items', id);
            getDoc(docRef).then((item) => {
                if (item.exists()) {
                    let prod = item.data();
                    prod.id = item.id;
                    getDoc(prod.categoryId).then((category) => {
                        let cat = category.data();
                        prod.category = cat.categoryLabel;
                        prod.categoryName = cat.categoryName;
                        setProduct(prod);
                    })
                }
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [id])

    if (loading)
        return (
            <Loading />
        )

    return <div className="detalleProducto">
        {id && product.name?.length > 0 &&
            <Producto key={product.id} product={product} getDetail={true} />
        }
        {product.length === 0 &&
            <NotFound from="prd" />
        }
        <div className="clear"></div>
    </div>;
};

export default DetalleProducto;
