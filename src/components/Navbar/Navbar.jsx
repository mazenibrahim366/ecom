import React, { useContext, useState } from "react";
import Style from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/freshcart-logo.svg";
import { UserContext } from "../../UserContext/UserContext";
import { CartContext } from "../../Cartcontext/Cartcontext";
import useWishlist from "../../Hooks/useWishlist";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  let Navigate = useNavigate();
let{isLoading,isError,data}= useWishlist()
  let { userToken, setUserToken } = useContext(UserContext);
  let { cart } = useContext(CartContext);
  function logOut() {
    Navigate("/login");
    localStorage.removeItem("userToken");
    setUserToken(null);
  }

  return (
    <>
      <div>
        <header className="fixed inset-x-0 top-0 z-50 bg-light capitalize">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex ">
              <span  className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src={Logo} alt="...." />
              </span>
            </div>
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-4">
              {userToken && (
                <>
                  <NavLink
                    to={""}
                    className="font-medium text-gray-900"
                    aria-current="home"
                  >
                    home
                  </NavLink>

                  <NavLink
                    to={"products"}
                    className="font-medium text-gray-900"
                  >
                    products
                  </NavLink>
                  <NavLink
                    to={"Categories"}
                    className="font-medium text-gray-900"
                  >
                    Categories
                  </NavLink>
                  <NavLink to={"brands"} className="font-medium text-gray-900">
                    brands
                  </NavLink>
                  <NavLink
                    to={"allorders"}
                    className="font-medium text-gray-900"
                  >
                    All Orders
                  </NavLink>

                </>
              )}
            </div>

            <div className="hidden lg:flex  lg:justify-end">
              {userToken ? (
                <>
                  <Link
                    to={"wishlist"}
                    className="font-medium text-main relative hover:text-main mx-3"
                  >
                    <i className="fas fa-heart hover:text-main"></i>
                    <span className="absolute left-4 -top-1  text-black font-extrabold text-sm">
                    {data?.data.data.length}
                    </span>
                  </Link>
                  <Link
                    to={"cart"}
                    className="font-medium text-main relative hover:text-main"
                  >
                    <i className="fas fa-shopping-cart hover:text-main"></i>
                    <span className="absolute left-4 -top-1  text-black font-extrabold text-sm">
                       {cart.numOfCartItems}
                    </span>
                  </Link>
                  <NavLink
                    to={"/login"}
                    onClick={() => {
                      logOut();
                    }}
                    className="font-medium text-gray-900 px-3 "
                  >
                    signOut
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to={"/login"}
                    className="font-medium text-gray-900 px-2 "
                  >
                    login
                  </NavLink>

                  <NavLink
                    to={"/register"}
                    className="font-medium text-gray-900"
                  >
                    register
                  </NavLink>
                </>
              )}
            </div>
          </nav>
          {/* Mobile menu, show/hide based on menu open state. */}
          <div
           onClick={() => setIsOpen(false)}
            className={isOpen ? "lg:hidden" : "hidden"}
            role="dialog"
            aria-modal="true"
          >
            {/* Background backdrop, show/hide based on slide-over state. */}
            <div className="fixed inset-0 z-50" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">

                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="-m-2.5 w-fit ms-auto rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {userToken && (
                      <>
                        <NavLink  onClick={() => setIsOpen(false)}
                          to={""}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                          aria-current="home"
                        >Home </NavLink>
                        <NavLink  onClick={() => setIsOpen(false)}
                          to={"cart"}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          cart                  <Link
                    to={"cart"}
                    className="font-medium  !text-main hover:text-main relative "
                  >
                    <i className="fas fa-shopping-cart !text-main hover:!text-main"></i>
                    <span className="absolute left-4 -top-1  text-black font-extrabold text-sm">
                       {cart.numOfCartItems}
                    </span>
                  </Link>
                        </NavLink>
                        <NavLink  onClick={() => setIsOpen(false)}
                          to={"products"}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          products
                        </NavLink>
                        <NavLink  onClick={() => setIsOpen(false)}
                          to={"Categories"}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          Categories
                        </NavLink>
                        <NavLink  onClick={() => setIsOpen(false)}
                          to={"brands"}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          brands
                        </NavLink>
                        <NavLink  onClick={() => setIsOpen(false)}
                          to={"wishlist"}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        >
        
                    wish list
                        
                        </NavLink>
                        <NavLink  onClick={() => setIsOpen(false)}
                          to={"allorders"}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          All Orders
                        </NavLink>
                      </>
                    )}
                  </div>
                  <div className="py-6">
                    {userToken ? (
                      <NavLink   
                        to={"/login"}
                        onClick={() => {
                          logOut();setIsOpen(false)
                        }}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        signOut
                      </NavLink>
                    ) : (
                      <>
                        <NavLink  onClick={() => setIsOpen(false)}
                          to={"/login"}
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          login
                        </NavLink>

                        <NavLink  onClick={() => setIsOpen(false)}
                          to={"register"}
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          register
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
