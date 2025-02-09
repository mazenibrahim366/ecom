import React from "react";
import Style from "./Categories.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FadeLoader } from "react-spinners";
export default function Categories() {
  const headers = { token: localStorage.getItem("userToken") };
  function setCategory() {
    return axios.get(
           "https://ecommerce.routemisr.com/api/v1/categories"

    
    );
  }

  let {data,isLoading} = useQuery({
    queryFn: setCategory,
    queryKey: "setCategory",

  });


  
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

                  <h5 className="text-center pt-3 font-extrabold">{item.name}</h5>
                


              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
