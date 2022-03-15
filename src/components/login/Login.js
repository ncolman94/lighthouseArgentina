import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

import { CartContext } from "../../context/CartContext";
import Loading from "../loading/Loading";
import { Navigate } from "react-router-dom";
import userDefault from "../../helper/Constants.js";

const Login = ({ actionLogin, from }) => {
  const { buyerInfo, setBuyerInfo, setFavorites } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();

    const setFavoritesFromDB = async (emailUser, datos) => {
      let aux = [];
      await datos.map(async (item) => {
        let fav = {
          email: emailUser,
          idFav: item.idFav,
          product: item.product,
        };
        aux.push(fav);
      });
      setFavorites(aux);
    };

    const addToFavorites = async (emailUser, query) => {
      const aux = [];
      const result = await getDocs(query);
      result.docs.map(async (item) => {
        let fav = item.data();
        fav.idFav = item.id;
        aux.push(fav);
      });
      setFavoritesFromDB(emailUser, aux);
      setLoading(false);
    };

    if (actionLogin === "out") {
      setBuyerInfo(userDefault);
      setFavorites([]);
      setLoading(false);
      const auth = getAuth();
      const logoutWithGoogle = () => {
        signOut(auth).then(() => {
          setBuyerInfo({
            name: "",
            phone: "",
            email: "",
            confirm_email: "",
            photoURL: "",
          });
        });
      };
      logoutWithGoogle();
    }

    if (actionLogin === "in" && buyerInfo.name === "") {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const loginWithGoogle = async () => {
        await signInWithPopup(auth, provider)
          .then(async (result) => {
            const guser = result.user;
            await setBuyerInfo({
              name: guser.displayName,
              phone: guser.phoneNumber,
              email: guser.email,
              confirm_email: guser.email,
              photoURL: guser.photoURL,
            });
            const qry = query(
              collection(db, "favorites"),
              where("email", "==", guser.email)
            );
            addToFavorites(guser.email, qry);
          })
          .catch((error) => {
            console.log("login error: ", error);
          })
          .finally(() => {
            setLoading(false);
          });
      };
      loginWithGoogle();
    }
  }, [actionLogin]);

  return loading ? (
    <Loading />
  ) : (
    <Navigate to={from !== undefined ? from : "/home"} />
  );
};

export default Login;
