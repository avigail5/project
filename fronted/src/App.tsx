import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import CustomImageList from "./pages/products";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // נעדכן סטייט בכל שינוי ב-localStorage (למשל בהתחברות)
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
        {/* אם נכנסים ל-root → הפניה לפי מצב התחברות */}
        <Route path="/" element={isLoggedIn ?  (
      <Navigate to="/products" />
    ) : (
      <SignIn setIsLoggedIn={setIsLoggedIn} disableCustomTheme={false} />
    )} />

        {/* דף הרשמה */}
        <Route path="/signUp" element={isLoggedIn ? <Navigate to="/products" /> : <SignUp />} />

        {/* דף מוצרים */}
        <Route
          path="/products"
          element={isLoggedIn ? <CustomImageList /> : <Navigate to="/" />}
        />

        {/* כל דף אחר */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
