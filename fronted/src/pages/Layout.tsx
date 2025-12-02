import React from "react";
import type { ReactNode } from "react"; // שים לב ל-"type" כאן
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/navbar";

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <ResponsiveAppBar />
      <main>
        {children ? children : <Outlet />}
      </main>
    </>
  );
}
