import axios from "axios";
import React from "react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [isCart, setCart] = useState(null);
  const [dataCart, setDataCart] = useState([]);
  const [cart, setaCart] = useState([]);
    const [louder, setLouder] = useState(true);
  const headers ={token: localStorage.getItem("userToken")}
  async function cartApi(productId) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
       { headers}
      );
  
      
      setCart(data);
      console.log(data.data);
      console.log(isCart.data);
      cartGetApi()
      toast.success(data.message)

      // console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }
    async function cartGetApi() {
      try {
        let { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/cart",
          { headers }
        );
   
        
        setDataCart(data.data);
        setaCart(data)
        setLouder(false);
      } catch (error) {
        console.log(error);
      }
    }
    async function cartUpdateApi(id, count) {
      try {
        let { data } = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
          {
            count,
          },
          { headers }
        );
 
  
        cartGetApi();
      } catch (error) {
        console.log(error);
      }
    }
    async function cartDeleteApi(id) {
      try {
        let { data } = await axios.delete(
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      
          { headers }
        );
   
  
        cartGetApi();
      } catch (error) {
        console.log(error);
      }
    }



    useEffect(() => {
      cartGetApi()
    
  
    }, [])


    
  return (
    <CartContext.Provider value={{ isCart, cartApi,cartDeleteApi,cartUpdateApi,cartGetApi ,louder,dataCart ,cart,headers}}>
      {children}
    </CartContext.Provider>
  );
}
