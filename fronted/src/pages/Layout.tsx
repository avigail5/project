import React from "react";
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../components/navbar";

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppNavbar />
      <main>
        {children ? children : <Outlet />}
      </main>
    </>
  );
}