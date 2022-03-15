import "./NavBar.css";

import { Link, NavLink } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

import CartWidget from "../cart/CartWidget";
import LoginWidget from "../login/LoginWidget";
import OrderFav from "./OrderFav";

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const aux = [];
    const db = getFirestore();
    getDocs(collection(db, "categories"))
      .then((cats) => {
        console.log(cats);
        cats.docs.forEach(async (cat) => {
          aux.push(cat.data());
        });
      })
      .finally(() => {
        setCategories(aux);
        setLoading(false);
      });
  }, []);

  return (
    <nav>
      <div className="logo">
        <Link to="/">Lighthouse Argentina</Link>
      </div>

      <ul className="tresquintos">
        {loading ? (
          <span>Cargando categorias...</span>
        ) : (
          categories.map((cat) => {
            let catLink = "/category/" + cat.categoryLabel;
            return (
              <li key={cat.categoryLabel}>
                <NavLink
                  to={catLink}
                  className={({ isActive }) => (isActive ? "current" : "")}
                >
                  {cat.categoryName}
                </NavLink>
              </li>
            );
          })
        )}
        <OrderFav />
      </ul>

      <div className="unquinto carrito">
        <LoginWidget />
        <CartWidget />
      </div>

      <div className="clear"></div>
    </nav>
  );
};

export default NavBar;
