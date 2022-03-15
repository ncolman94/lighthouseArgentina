import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cart from "../components/cart/Cart";
import Catalogo from "../components/catalogo/Catalogo";
import Checkout from "../components/checkout/Checkout";
import DetalleProducto from "../components/producto/DetalleProducto";
import Favorites from "../components/favorites/Favorites";
import Login from "../components/login/Login";
import NavBar from "../components/navbar/NavBar";
import NotFound from "../components/not-found/NotFound";
import Order from "../components/order/Order";
import Orders from "../components/order/Orders";

const Router = () => {
  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/home" element={<Catalogo />} />
        <Route path="/category/:id" element={<Catalogo />} />
        <Route path="/item/:id" element={<DetalleProducto />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkorder" element={<Order />} />
        <Route path="/checkorder/:orderId" element={<Order />} />
        <Route path="/login" element={<Login actionLogin="in" />} />
        <Route path="/logout" element={<Login actionLogin="out" />} />
        <Route
          path="/login-checkout"
          element={<Login actionLogin="in" from="/checkout" />}
        />
        <Route
          path="/logout-checkout"
          element={<Login actionLogin="out" from="/checkout" />}
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/myorders" element={<Orders />} />
        <Route path="*" element={<NotFound from="pag" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
