import axios from "axios";
import { createContext, useState } from "react";

 export let AuthenticationContext = createContext()



 import React from 'react'
import toast from "react-hot-toast";

 
 export default function AuthenticationContextProvider({children}) {


  const [statusMessage, setStatusMessage] = useState('')

  const [message, setMessage] = useState('')
 

 async function getDataForget(email) {
let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",{email}) 


setMessage(data.message);


    
  }
 async function sendVerifyReset(resetCode) {


try {
  
let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",{resetCode}) 

setStatusMessage(data?.status);

toast.success(data.status);


    
  
} catch (error) {

  setMessage(error?.response?.data.message);




}
  }
   return  <>
    
       
<AuthenticationContext.Provider value={{getDataForget,message,statusMessage,sendVerifyReset ,setStatusMessage}}>{children}</AuthenticationContext.Provider>

     </>
   
 }
 