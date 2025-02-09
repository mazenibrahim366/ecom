import React, { useContext } from "react";
import Style from "./Brands.module.css";
import { useQuery } from "@tanstack/react-query";
import { FadeLoader } from "react-spinners";
import axios from "axios";



export default function Brands() {


  function getApiBrands() {
    return  axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    
  }
let {isLoading,isError,data} = useQuery(
  {

    queryKey:'getApiBrands',
    queryFn:getApiBrands
  }
)
  

  
  return (
    <>
          {isLoading ? (
        <div className="flex justify-center items-center h-[80vh] ">
          <FadeLoader />
        </div>
      ) : (
        <div className="flex flex-wrap py-3 gap-y-2 justify-center">
          {data?.data.data.map((item, index) => (
            <div key={index} className=" w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
              <div className=" product h-[350px] p-2 rounded-lg overflow-hidden ">
              
                  <img
                    className=" w-full  h-[200px] object-cover object-top "
                    src={item.image}
                    alt=""
                  />

                  <h5 className="text-center font-extrabold">{item.name}</h5>
                
                    
    

              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
