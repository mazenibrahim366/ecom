import React from "react";
import Style from "./HomeSlider.module.css";
import slid1 from '../../assets/slider-image-1.jpeg'
import slid2 from '../../assets/slider-image-2.jpeg'
import slid3 from '../../assets/slider-image-3.jpeg'
import slid4 from '../../assets/grocery-banner-2.jpeg'
import slid5 from '../../assets/grocery-banner.png'
import  Slider from 'react-slick';
export default function HomeSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    
    autoplay:true,

  };
  return (
    <>



<div className="flex">

  <div className="w-full ">


  <Slider {...settings}>
    <img src={slid1} className="w-full" alt="" /> 
    <img src={slid2} className="w-full" alt="" /> 
    <img src={slid3} className="w-full" alt="" /> 
  </Slider>
  </div>

</div>
    </>
  );
}
