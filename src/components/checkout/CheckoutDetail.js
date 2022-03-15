import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Form from '../checkout/Form';
import { collection, doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore';

const CheckoutDetail = ({ buyer, setOrderID, setMessage, setBuyer }) => {
    const { cartInfo, totalAmount, clear, buyerInfo } = useContext(CartContext);

    const [validation, setValidation] = useState(
        {
            name: '',
            phone: '',
            email: '',
            confirm_email: '',
        }
    );

    const validateBuyer = () => {
        let rtn = true;
        if (buyerInfo.name === '') {
            if (buyer.name.length <= 3) {
                rtn = false;
                setValidation({ ...validation, name: 'Por favor, complete su nombre completo.' });
            }
            if (rtn && !/^[0-9]+$/.test(buyer.phone.trim())) {
                rtn = false;
                setValidation({ ...validation, phone: 'Por favor, ingrese solo números en su teléfono.' });
            }
            let patronEmail = /^[a-zA-Z0-9._-]+([+][a-zA-Z0-9._-]+){0,1}[@][a-zA-Z0-9._-]+[.][a-zA-Z]{2,6}$/;

            if (rtn && !patronEmail.test(buyer.email.trim())) {
                rtn = false;
                setValidation({ ...validation, email: 'Por favor, ingrese un correo electrónico válido.' });
            }
            if (rtn && (!patronEmail.test(buyer.confirm_email.trim()) || buyer.confirm_email.trim() !== buyer.email.trim())) {
                rtn = false;
                setValidation({ ...validation, confirm_email: 'Los correos ingresados NO coinciden. Por favor, verificar.' });
            }
        }
        return rtn;
    }

    const sendOrder = async () => {

        if (validateBuyer()) {
            let inStock = true;
            if (cartInfo.length !== 0) {
                const db = getFirestore();
                const batch = writeBatch(db);
                const newOrder = doc(collection(db, 'orders'));

                const { confirm_email, ...cleanBuyer } = buyerInfo.name === '' ? buyer : buyerInfo;

                batch.set(newOrder, {
                    buyer: cleanBuyer,
                    items: cartInfo.map(({ id, category, categoryId, description, stock, ...atributosFiltrados }) => atributosFiltrados),
                    date: new Date().toLocaleString(),
                    total: totalAmount,
                    state: 'created'
                })

                await Promise.all(
                    cartInfo.map(async (prod) => {
                        let itemRef = doc(db, 'items', prod.id);
                        const docProd = await getDoc(itemRef);
                        let stockActual = docProd.data().stock;
                        if (stockActual >= prod.quantity) {
                            batch.update(itemRef, { stock: stockActual - prod.quantity });
                        } else {
                            inStock = false;
                        }
                    }));

                if (inStock) {
                    batch.commit();
                    setOrderID(newOrder.id);
                    setMessage('Su orden se ha registrado bajo el código:');
                } else {
                    setMessage('Se presentó un problema de Stock con sus productos.<br>Por favor, verifique los mismos actualizados.');
                }
                clear();
            }
        }
    }

    return <div>
        <div className="productos finalizar">
            <div className="totalCarrito">
                {totalAmount > 0 && <p>Total: AR$ {totalAmount}</p>}
            </div>
            <Form buyer={buyer} validation={validation} setBuyer={setBuyer} setValidation={setValidation} buyerInfo={buyerInfo} />
        </div>
        <div>
            <Link to={'/home'} className="seguirComprando">Seguir Comprando</Link>
            <button className="registrarCompra" onClick={sendOrder}>Registrar mi Orden</button>
        </div>
    </div>
};

export default CheckoutDetail;