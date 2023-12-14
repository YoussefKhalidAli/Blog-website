import React from "react";
import NavBar from "../Components/Navbar/navBar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
