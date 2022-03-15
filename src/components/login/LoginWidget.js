import "./LoginWidget.css";

import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { PersonFill } from "react-bootstrap-icons";
import { useContext } from "react";

const LoginWidget = () => {
  const { buyerInfo } = useContext(CartContext);

  return (
    <>
      {buyerInfo.name === "" ? (
        <Link to="/login" className="googleImage">
          <PersonFill
            title="Login con Google"
            alt="Login con Google"
            width="48"
          />
        </Link>
      ) : (
        <Link to="/logout" className="googleImage">
          <img
            src={buyerInfo.photoURL}
            title="Logout"
            alt="Logout"
            width="48"
            referrerPolicy="no-referrer"
          />
        </Link>
      )}
    </>
  );
};

export default LoginWidget;
