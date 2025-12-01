import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import CustomImageList from "./pages/products";

function App() {
  // בדיקה פשוטה אם המשתמש מחובר
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* אם נכנסים ל-root, הפנייה לדף התחברות */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/products" /> : <SignIn />} />

        {/* דף הרשמה */}
        <Route path="/signUp" element={isLoggedIn ? <Navigate to="/products" /> : <SignUp />} />

        {/* דף מוצרים - רק אם המשתמש מחובר */}
        <Route
          path="/products"
          element={isLoggedIn ? <CustomImageList /> : <Navigate to="/" />}
        />

        {/* כל נתיב אחר מפנה לדף התחברות */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
