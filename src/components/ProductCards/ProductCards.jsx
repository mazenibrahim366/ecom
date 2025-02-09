import React, { useContext, useEffect, useRef, useState } from "react";
import Style from "./ProductCards.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { CartContext } from "./../../Cartcontext/Cartcontext";
import { WishListContext } from "../../WishLIstContext/WishListContext";

import useWishlist from "../../Hooks/useWishlist";
import { useQuery } from "@tanstack/react-query";

export default function ProductCards() {

  let { cartApi } = useContext(CartContext);
  let { setApiWishList, removeApiWishList ,dataWishList,setDataWishList} = useContext(WishListContext);
let res= useWishlist()
    





  function getApiProducts() {
    return  axios.get('https://ecommerce.routemisr.com/api/v1/products')
    
  }
let {isLoading,isError,data} = useQuery(
  {

    queryKey:'getApiProducts',
    queryFn:getApiProducts
  }
)


  useEffect(() => {
    setDataWishList(res?.data?.data?.data?.map((item) => item.id))

 
  },[res?.data?.data?.data]);



 
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[80vh] ">
          <FadeLoader />
        </div>
      ) : (

        <div className="flex flex-wrap py-3 gap-y-2 justify-center">
          {data.data.data.map((item, index) => (
            
            
            <div key={item.id} className="w-full sm:w-4/12 md:w-3/12 lg:w-2/12 relative" >
             
              <div className=" relative product group h-[350px] p-2 rounded-lg overflow-hidden ">
                <Link to={`/productDetails/${item.id}`}>
                  <img
                    className=" w-full  h-[200px] sm:object-cover sm:object-top object-contain"
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
                <button
                  onClick={() => {
                    cartApi(item.id);
                  }}
                  className="trans opacity-100 translate-y-[0%] sm:opacity-0 sm:translate-y-[100%] sm:group-hover:opacity-100 sm:group-hover:translate-y-[0%]  w-full bg-main text-white rounded-md p-1  "
                >
                  Add To Cart{" "}
                </button>
                <button    

                  onClick={() => {((dataWishList?.includes(item.id))?removeApiWishList(item.id) :setApiWishList(item.id))}}
                  className="absolute  top-2 right-2"
                >
                  

                  <i    className={`${dataWishList?.includes(item.id)?"fa-solid":"fa-regular"} fa-heart text-red-700 `}></i>
                 
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
