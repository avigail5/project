import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/navbar";

export default function Layout() {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />   {/* כאן יוצגו כל העמודים בהתאם ל־Route */}
    </>
  );
}
