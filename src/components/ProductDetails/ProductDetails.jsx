import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { FadeLoader } from "react-spinners";
import { CartContext } from "../../Cartcontext/Cartcontext";
export default function ProductDetails() {
  const [productDetailsData, setProductDetailsData] = useState([]);
  const [louder, setLouder] = useState(true);
  let { id } = useParams();
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,

    autoplay: true,
  };
  let { cartApi } = useContext(CartContext);
  async function apiProductDetails() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetailsData(data.data);
      setLouder(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    apiProductDetails();
  }, []);
  return (
    <>
      {louder ? (
        <div className="flex justify-center items-center h-[80vh] ">
          <FadeLoader />
        </div>
      ) : (
        <div className="flex py-8 ">
          <div className="w-4/12 rounded-md">
            <Slider {...settings}>
              {productDetailsData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className="w-full rounded-md "
                  alt=""
                />
              ))}
            </Slider>
          </div>
          <div className="w-8/12 ps-3 mt-10   ">
            <h3 className="pb-3 font-semibold">{productDetailsData.title}</h3>
            <p className="pb-3 text-slate-600 font-medium" pb-3>
              {productDetailsData.description}
            </p>
            <p className="pb-3 font-bold text-slate-800" pb-3>
              {productDetailsData.category.name}
            </p>
            <div className="flex justify-between pb-2 ">
              <span> {productDetailsData.price} EGP</span>
              <span>
                {productDetailsData.ratingsAverage}
                <i className="fas fa-star rating-color"></i>
              </span>
            </div>
            <button
              onClick={() => {
                cartApi(id);
              }}
              className="btn mt-10 w-full bg-main text-white rounded-md p-2 "
            >
              Add To Cart{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
