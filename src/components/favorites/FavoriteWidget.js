import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

import { CartContext } from "../../context/CartContext";
import iconoFavoritoOFF from "../../img/iconoFavoritoOFF.svg";
import iconoFavoritoON from "../../img/iconoFavoritoON.svg";
import registrandoFavorito from "../../img/registrandoFavorito.gif";

const FavoriteWidget = ({ product, isFavoriteYet }) => {
  const { buyerInfo, favorites, removeFavorite, addFavorite, isInFavorites } =
    useContext(CartContext);

  const [isFavorite, setIsFavorite] = useState(
    isFavoriteYet !== undefined ? isFavoriteYet : false
  );
  const [registering, setRegistering] = useState(false);
  const { price, stock, description, categoryId, category, ...cleanProd } =
    product;

  const db = getFirestore();

  const removeFromFavorites = async (itemId) => {
    const fav = favorites.find((fav) => fav.product.id === itemId);
    await deleteDoc(doc(db, "favorites", fav.idFav));
    await removeFavorite(itemId);
  };

  const addToFavorites = async (item) => {
    const docRef = await addDoc(collection(db, "favorites"), {
      email: buyerInfo.email,
      product: item,
    });
    await addFavorite(docRef.id, item);
  };

  const toggleFavorite = async () => {
    setRegistering(true);

    let cleanProdFav =
      cleanProd.idFav !== undefined ? cleanProd.product : cleanProd;

    if (isFavorite) {
      await removeFromFavorites(cleanProdFav.id);
    } else {
      await addToFavorites(cleanProdFav);
    }

    if (isFavoriteYet === undefined) {
      setIsFavorite(!isFavorite);
      setRegistering(false);
    }
  };

  useEffect(() => {
    if (isInFavorites(product.id)) setIsFavorite(true);
  }, []);

  return (
    <>
      {registering ? (
        <img
          className="favoriteIcon"
          src={registrandoFavorito}
          alt="Registrando cambio"
        />
      ) : isFavorite || isInFavorites(product.id) ? (
        <img
          onClick={toggleFavorite}
          className="favoriteIcon"
          src={iconoFavoritoON}
          alt="Producto marcado como Favorito"
        />
      ) : (
        <img
          onClick={toggleFavorite}
          className="favoriteIcon"
          src={iconoFavoritoOFF}
          alt="Producto aun NO marcado como Favorito"
        />
      )}
    </>
  );
};

export default FavoriteWidget;
