import { createContext, useEffect, useState } from "react";

import axios from "axios";

import useWishlist from "../Hooks/useWishlist";
import toast from "react-hot-toast";

export let WishListContext = createContext();



export default function WishListContextProvider({ children }) {
  let res= useWishlist()
  const [dataWishList, setDataWishList] = useState([])
  const headers = { token: localStorage.getItem("userToken") };
   useEffect(() => {
  res.isLoading&&   setDataWishList(res?.data?.data?.data?.map((item) => item.id))
     //  wishlistIds = res?.data?.data?.data?.map((item) => item.id);
     // setProductWishList(res?.data?.data?.data?.map((id) => {
     //   return setProductWishList(productWishList+id.id)
     // }))
     // setProductWishList(wishlistIds)
    

   }, []);

  async function setApiWishList(productId) {



// if(wishListItems.includes(productId)) {




// }


    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      { headers }

    );
    toast.success(data.message)
    
    setDataWishList(data.data)
 

 
  }
  async function removeApiWishList(productId) {
   try {
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      
      { headers }
    );
    
    setDataWishList(data.data)
    

      toast.error(data.message)
   } catch (error) {
    console.log(error);
   }

  
  }

  return (
    <>
      <WishListContext.Provider value={{removeApiWishList, setApiWishList,dataWishList,setDataWishList }}>
        {children}
      </WishListContext.Provider>
    </>
  );
}
