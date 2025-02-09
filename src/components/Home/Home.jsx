import React from "react";
import Style from "./Home.module.css";
import HomeSlider from './../HomeSlider/HomeSlider.jsx';
import ProductSlider from './../ProductSlider/ProductSlider.jsx';
import ProductCards from './../ProductCards/ProductCards.jsx';
export default function  Home() {
  return (
    <>
      <HomeSlider/>
      <ProductSlider/>
      <ProductCards/>
    </>
  );
}
