import React, { useContext, useEffect, useState } from "react";
import Style from "./Card.module.css";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { CartContext } from "../../Cartcontext/Cartcontext";
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
export default function Card() {
  const headers ={token: localStorage.getItem("userToken")}
let {cartDeleteApi,cartUpdateApi,cartGetApi,louder,dataCart}=useContext(CartContext)

  return (
    <>
      {louder ? (
        <div className="flex justify-center items-center h-[80vh] ">
          <FadeLoader />
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-fit mx-auto   lg:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-2 md:p-3 lg:p-6 w-fit">
              
                </th>
                <th scope="col" className=" p-2 md:p-3 lg:p-6">
                  Product
                </th>
                <th scope="col" className="p-2 md:p-3 lg:p-6">
                  Qty
                </th>
                <th scope="col" className="p-2 md:p-3 lg:p-6">
                  Price
                </th>
                <th scope="col" className="p-2 md:p-3 lg:p-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dataCart.products.map((product, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-1 !w-fit ">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="Apple Watch"
                    />
                  </td>
                  <td className="p-2 md:p-3 lg:p-6 font-semibold text-gray-900 dark:text-white">
                    {product.product.category.name}
                  </td>
                  <td className="p-2 md:p-3 lg:p-6">
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          product.count== 1 ? cartDeleteApi(product.product.id):cartUpdateApi(product.product._id, product.count- 1);
                        }}
                        className="inline-flex items-center justify-center p-1  text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span
                          type="number"
                          id="first_product"
                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        >
                          {product.count}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          cartUpdateApi(product.product.id, product.count+1);
                        }}
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="p-2 md:p-3 lg:p-6 font-semibold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </td>
                  <td className="p-2 md:p-3 lg:p-6">
                    <button 
                      onClick={()=>cartDeleteApi(product.product.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>

<Link to={'/checkout'}><button className="m-5 px-3  py-2 font-bold text-light bg-main rounded-md">checkOut</button></Link>

            </tfoot>
          </table>
        </div>
      )}
    </>
  );
}
