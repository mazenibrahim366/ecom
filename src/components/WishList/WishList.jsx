import React, { useContext, useEffect, useState } from "react";
import Style from "./WishList.module.css";
import axios from "axios";
import { FadeLoader } from "react-spinners";

import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import useWishlist from "../../Hooks/useWishlist";
import { CartContext } from "../../Cartcontext/Cartcontext";
import { WishListContext } from "../../WishLIstContext/WishListContext";
export default function WishList() {
  const headers ={token: localStorage.getItem("userToken")}
let{isLoading,isError,data}= useWishlist()
let {cartApi}=useContext(CartContext)
let {removeApiWishList,dataWishList}=useContext(WishListContext)


console.log(data?.data.data);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[80vh] ">
          <FadeLoader />
        </div>
      ) : (
        <div className="flex flex-wrap py-3 gap-y-2 justify-center">
          {data.data.data.map((item, index) => (
            <div key={item.id} className="w-full sm:w-4/12 md:w-3/12 lg:w-2/12">
              <div className="group product h-[400px] p-2  rounded-lg overflow-hidden ">
                <Link to={`/productDetails/${item.id}`}>
                  <img
                    className=" w-full  h-[200px] sm:object-cover sm:object-top object-contain "
                    src={item.imageCover}
                    alt=""
                  />

                  <h5 className="text-main"> {item.category.name} </h5>
                  <h3 className=" text-md">
                    {item.title.split(" ", 2).join(" ")}
                  </h3>
                  <div className="flex justify-between pb-2 ">
                    <span> {item.price}EGP</span>
                    <span>
                      {item.ratingsAverage}
                      <i className="fas fa-star rating-color"></i>
                    </span>
                  </div>
                </Link>
               <div className="flex flex-wrap gap-2 pb-8">
               <button
                  onClick={() => {
                    cartApi(item.id);
                  }}
                  className=" trans opacity-100 translate-y-[0%] sm:opacity-0 sm:translate-y-[100%] sm:group-hover:opacity-100 sm:group-hover:translate-y-[0%]  w-full bg-main text-white rounded-md p-1  "
                >
                  Add To Cart{" "}
                </button>
                <button
                  onClick={() => {
                    removeApiWishList(item.id);
                  }}
                  className="  trans opacity-100 translate-y-[0%] sm:opacity-0 sm:translate-y-[100%] sm:group-hover:opacity-100 sm:group-hover:translate-y-[0%]  w-full   rounded-md  text-sm  font-bold   bg-red-600  text-white p-2 "
                >
                  Remove Wish List{" "}
                </button>
               </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
