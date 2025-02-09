"use client";
import axios from "axios";

import { Table, Button, Modal, Select } from "flowbite-react";
import Style from "./AllOrders.module.css";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function AllOrders() {
  const [openModal, setOpenModal] = useState(true);
  const [modalPlacement, setModalPlacement] = useState("top-center");

  const [productItems, setProductItems] = useState(null);

  const token = localStorage.getItem("userToken");
  const decoded = jwtDecode(token);


  function allOrdersGetApi() {
    return  axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`)
    
  }
let {isLoading,isError,data} = useQuery(
  {

    queryKey:'allOrdersGetApi',
    queryFn:allOrdersGetApi
  }
)
  
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center  h-[80vh] ">
          <FadeLoader />
        </div>
      ) : (
        <div className=" ">
          <Table striped  className=" w-fit mx-auto   lg:w-full">
            <Table.Head>
              <Table.HeadCell className="p-2 md:p-3 lg:p-6">
                date baying{" "}
              </Table.HeadCell>
              <Table.HeadCell className="p-2 md:p-3 lg:p-6">
                is Delivered
              </Table.HeadCell>
              <Table.HeadCell className="p-2 md:p-3 lg:p-6">
                items
              </Table.HeadCell>
              <Table.HeadCell className="p-2 md:p-3 lg:p-6">
                is Paid
              </Table.HeadCell>
              <Table.HeadCell className="p-2 md:p-3 lg:p-6">
                Type payment
              </Table.HeadCell>
              <Table.HeadCell className="p-2 md:p-3 lg:p-6">
                total Price
              </Table.HeadCell>
              <Table.HeadCell className="p-2 md:p-3 lg:p-6">
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y ">
              {data.data?.map((order, index) => (
                <Table.Row
                  key={index}
                  className="bg-white p-2 md:p-3 lg:p-6 dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap p-2 md:p-3 lg:p-6 font-medium text-gray-900 dark:text-white">
                    {order.updatedAt.split("", 10).join("")}
                  </Table.Cell>
                  <Table.Cell className="p-2 md:p-3 lg:p-6">
                    {order.isDelivered ? "Yes" : "No"}
                  </Table.Cell>
                  <Table.Cell className="p-2 md:p-3 lg:p-6">
                    {order.cartItems.length}
                  </Table.Cell>
                  <Table.Cell className="p-2 md:p-3 lg:p-6">
                    {order.isPaid ? "Yes" : "No"}
                  </Table.Cell>
                  <Table.Cell className="p-2 md:p-3 lg:p-6">
                    {order.paymentMethodType}
                  </Table.Cell>
                  <Table.Cell className="p-2 md:p-3 lg:p-6">
                    {order.totalOrderPrice}
                  </Table.Cell>
                  <Table.Cell className="p-2 md:p-3 lg:p-6">
                    <button
                      onClick={() => {
                        setProductItems(order.cartItems);
                        setOpenModal(true);
                      }}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      see items
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
      {productItems && (
        <Modal
          show={openModal}
          position={modalPlacement}
          onClick={() => setOpenModal(false)}
        >
          <Modal.Body>
            <div className="flex flex-wrap py-3 justify-center">
              {productItems.map((item, index) => (
                <div key={index} className=" w-full sm:w-4/12 md:w-3/12 lg:w-2/12">
                  <div className=" product p-2 rounded-lg overflow-hidden ">
                    <img
                      className=" w-full  h-[200px] object-cover object-top "
                      src={item.product.imageCover}
                      alt=""
                    />

                    <h3 className=" text-md">
                      {item.product.subcategory[0].title
                        ?.split(" ", 2)
                        .join(" ")}
                    </h3>
                    <div className="flex flex-column flex-wrap  pb-2 ">
                      <span className="font-extrabold"> {item.price}EGP</span>
                      <span>
                        count :<span className="text-main"> {item.count}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
