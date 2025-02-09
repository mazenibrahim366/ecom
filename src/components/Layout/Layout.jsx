import React from "react";
import Style from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar.jsx";
import Footer from "./../Footer/Footer.jsx";
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container h-[75vh] pt-9 mt-10">
        <Outlet ></Outlet>
      </div>
      <Footer />
    </>
  );
}
