import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import CustomImageList from "./pages/products";
import CartPage from "./pages/cart";
import OrdersPage from "./pages/orders";
import AppNavbar from "./components/navbar";
import Layout from "./pages/Layout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // עדכון סטייט בכל שינוי ב-localStorage (למשל בהתחברות)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? (<Navigate to="/products" />) : (
      <SignIn setIsLoggedIn={setIsLoggedIn} disableCustomTheme={false} />
    )} />
        <Route path="/signUp" element={isLoggedIn ? <Navigate to="/products" /> : <SignUp />} />
        <Route element={<Layout setIsLoggedIn={setIsLoggedIn} />}>
        <Route path="/products" element={isLoggedIn ? <CustomImageList /> : <Navigate to="/" />} />
        <Route path="/cart" element={isLoggedIn ? <CartPage /> : <Navigate to="/" />} />
        <Route path="/orders" element={isLoggedIn ? <OrdersPage /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
