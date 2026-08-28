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
import Order from "./components/order/Order";
import OrderDetails from "./components/orderDetails/OrderDetails";
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import AdminProducts from "./components/admin/products/AdminProducts";

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
          <Route
            path="orders"
            element={<Order />}
          />

          <Route
            path='orders/:id'
            element={<OrderDetails />}
          />
          <Route element={<AdminRoute />}>
            <Route
              path="admin"
              element={<AdminDashboard />}
            />
            <Route
              path="admin/products"
              element={<AdminProducts />}
            />
          </Route>

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