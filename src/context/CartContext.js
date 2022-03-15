import { createContext } from 'react';
import { LocalStorage } from '../helper/LocalStorage';
import userDefault from '../helper/Constants.js'

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartInfo, setCartInfo] = LocalStorage("cartInfo", []);
    const [totalAmount, setTotalAmount] = LocalStorage("totalAmount", 0);

    const [buyerInfo, setBuyerInfo] = LocalStorage("buyerInfo", userDefault);
    const [favorites, setFavorites] = LocalStorage("favorites", []);

    const addItem = (currentItem, quantity) => {
        if (quantity === 0)
            removeItem(currentItem.id);
        else {
            currentItem.quantity = quantity;
            if (!isInCart(currentItem.id)) {
                setCartInfo([...cartInfo, currentItem]);
            } else {
                setCartInfo(cartInfo.map(prod =>
                    prod.id === currentItem.id
                        ? { ...prod, quantity: quantity }
                        : prod
                ));
            }
        }
    }

    const addFavorite = (idFavorite, currentItem) => {
        if (!isInFavorites(currentItem.id))
            setFavorites([...favorites, { email: buyerInfo.email, idFav: idFavorite, product: currentItem }]);
    }

    const removeFavorite = (itemId) => {
        setFavorites(favorites.filter(favorite => favorite.product.id !== itemId))
    }

    const removeItem = (itemId) => {
        setCartInfo(cartInfo.filter(product => product.id !== itemId))
    }

    const clear = () => {
        setCartInfo([]);
        setTotalAmount(0);
    }

    const isInFavorites = (itemId) => {
        return favorites?.some((item) => item.product.id === itemId) ? true : false;
    }

    const isInCart = (itemId) => {
        return cartInfo?.some((item) => item.id === itemId) ? true : false;
    }

    const getTotalAmount = () => {
        let aux = 0;
        if (cartInfo.length !== 0) {
            cartInfo.forEach((product) => {
                aux += (product.price * product.quantity);
            })
        }
        setTotalAmount(aux);
    }

    const getQuantity = () => {
        let rtn = 0;
        cartInfo.forEach((product) => {
            rtn += product.quantity;
        })
        return rtn;
    }

    return (
        <CartContext.Provider value={{ cartInfo, totalAmount, addItem, clear, removeItem, isInCart, setTotalAmount, getTotalAmount, getQuantity, buyerInfo, setBuyerInfo, favorites, setFavorites, removeFavorite, addFavorite, isInFavorites }}>
            {children}
        </CartContext.Provider>
    );
}
