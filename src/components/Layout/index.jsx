import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Footer from "./Footer";
import "./style.scss";

export default function Layout() {
  return (
    <div className="container">
      <Topbar />
      <Outlet />
      <Footer />
    </div>
  );
}
