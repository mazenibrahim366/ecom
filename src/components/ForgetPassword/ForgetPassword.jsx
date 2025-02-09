import React, { useContext } from "react";
import Style from "./ForgetPassword.module.css";
import { AuthenticationContext } from './../../AuthenticationContext/AuthenticationContext';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
export default function ForgetPassword() {

let {message,statusMessage,sendVerifyReset,setStatusMessage}= useContext(AuthenticationContext)
let navigate =useNavigate()

function sendResetCode(e) {
  sendVerifyReset(`${e.resetCode}`)
 
  
}
if (statusMessage=="Success") {
  navigate("/resetpassword")
  setStatusMessage('')

}
console.log(statusMessage);


const formik =useFormik({initialValues: {
 resetCode:'',

  },onSubmit:sendResetCode,

 



})
  return (
    <>
      
     

<section className=  "bg-gray-50  dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[70vh] lg:py-0">

    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
      <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      {message}
      </h2>
      <form onSubmit={formik.handleSubmit}  className="mt-4 space-y-4 lg:mt-5 md:space-y-5" >
        <div>

          <input type="number" value={formik.values.resetCode} onBlur={formik.handleBlur} onChange={formik.handleChange} 
           name="resetCode" id="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        <button type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Check Code</button>
      </form>
    </div>
  </div>
</section>

    </>
  );
}
