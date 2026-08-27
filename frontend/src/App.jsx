import Header2 from "./components/header/Header2";
import Footer from "./components/footer/Footer"
import Layout from "./components/Layout/Layout";
import ProductGrid from './components/ProductGrid/ProductGrid'
import { Route, Routes } from "react-router-dom";
import Cart from "./components/cart/Cart";
import ProductDetails from "./components/productDetails/ProductDetails";
import NotFound from "./components/notFound/NotFound";
import Home from "./components/home/Home";
import { useState } from "react";
import Wishlist from "./components/wishlist/Wishlist";
import Login from "./components/login/Login";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import Register from "./components/register/Register";
import Checkout from "./components/checkout/Checkout";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={<Home />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="wishlist"
            element={<Wishlist />}
          />

          <Route
            path="cart"
            element={<Cart />}
          />
          <Route
            path="checkout"
            element={<Checkout />}
          />
        </Route>
        <Route
          path='login'
          element={<Login />}
        />
        <Route
          path="register"
          element={<Register />}
        />

        <Route
          path="products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>
    </Routes>
  );
}
export default App;