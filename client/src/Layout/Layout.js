//imported tools
import React from "react";
import { Outlet } from "react-router";

//imported components
import NavBar from "../Components/Navbar/navBar";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
