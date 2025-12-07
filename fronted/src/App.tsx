import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import CustomImageList from "./pages/products";
import CartPage from "./pages/cart";
import OrdersPage from "./pages/orders";
import AppNavbar from "./components/navbar";
import Layout from "./pages/Layout";
import CreateProductForm from "./pages/createProductForm";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

useEffect(() => {
  const token = localStorage.getItem("token");
  const expireTime = localStorage.getItem("expireTime");

  if (!token) {
    setIsLoggedIn(false);
    return;
  }

  if (expireTime) {
    const now = new Date().getTime();

    if (now > Number(expireTime)) {
      localStorage.clear();
      setIsLoggedIn(false);
      return;
    }
  }

  setIsLoggedIn(true);
}, []);


  return (
    
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? (<Navigate to="/products" />) : (
      <SignIn setIsLoggedIn={setIsLoggedIn} disableCustomTheme={false} />
    )} />
        <Route path="/signUp" element={isLoggedIn ? <Navigate to="/products" /> : <SignUp setIsLoggedIn={setIsLoggedIn} />} />
        <Route element={<Layout setIsLoggedIn={setIsLoggedIn} />}>
        <Route path="/products" element={isLoggedIn ? <CustomImageList /> : <Navigate to="/" />} />
        <Route path="/cart" element={isLoggedIn ? <CartPage /> : <Navigate to="/" />} />
        <Route path="/orders" element={isLoggedIn ? <OrdersPage /> : <Navigate to="/" />} />
        <Route path="/add-product" element={isLoggedIn ? <CreateProductForm /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
