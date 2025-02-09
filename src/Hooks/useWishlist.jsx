import { useContext, useState } from "react";

import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";



export default function useWishlist() {
 

  const headers = { token: localStorage.getItem("userToken") };
  function setApiWishList() {
    return axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",

      { headers }
    );
  }

  let res = useQuery({
    queryFn: setApiWishList,
    queryKey: "setApiWishList",

  
  });

// useMutation
  return res;
}
