import React from "react";
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../components/navbar";

interface LayoutProps {
  children?: ReactNode;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Layout({ children, setIsLoggedIn }: LayoutProps) {
  return (
    <>
       <AppNavbar setIsLoggedIn={setIsLoggedIn} />
      <main >
        {children ? children : <Outlet />}
      </main>
    </>
  );
}