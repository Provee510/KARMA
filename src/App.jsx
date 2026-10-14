
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Entry from "./pages/entry/Entry";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Storefront from "./pages/shop/Storefront";
import Products from "./pages/shop/Products";
import ProductDetails from "./pages/shop/ProductDetails";
import Collections from "./pages/shop/Collections";
import Search from "./pages/shop/Search";
import Cart from "./pages/cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entry />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/shop" element={<Storefront />} />
        <Route path="/shop/products" element={<Products />} />
        <Route path="/shop/products/:id" element={<ProductDetails />} />
        <Route path="/shop/collections" element={<Collections />} />
        <Route path="/shop/search" element={<Search />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
