import React, { useEffect, useState } from "react";
import Style from "./ProductSlider.module.css";
import { FadeLoader } from "react-spinners";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export default function ProductSlider() {
    const [dataCategories, setDataCategories] = useState([]);
    const [louder, setLouder] = useState(true);
//     async function CategoriesApi() {
//       try {
//         let { data } = await axios.get(
//           "https://ecommerce.routemisr.com/api/v1/categories"
//         );
//         setDataCategories(data.data);
//         setLouder(false);
       
//       } catch (error) {
// console.log(error);



//       }
//     }
  
//     useEffect(() => {
//       CategoriesApi();
//     }, []);

function CategoriesApi() {
  return  axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  
}
let {isLoading,isError,data} = useQuery(
{

  queryKey:'CategoriesApi',
  queryFn:CategoriesApi
}
)

  return (
    <>
  <>
      {isLoading ? (
       <div className="flex justify-center items-center h-[80vh] ">
       <FadeLoader />
     </div>
      ) : (
        <div className="flex flex-wrap py-3 gap-y-2 justify-center">
          {data.data?.data.map((item, index) => (
            <div key={index} className="w-1/2 md:w-4/12 lg:w-1/5">
              <div className="  ">
                <img src={item.image} className=" w-full  h-[200px] object-cover object-top" alt="" />
                <h4 className=""> {item.name}</h4>


              </div>
            </div>
          ))}
        </div>
      )}
    </>

    </>
  );
}
