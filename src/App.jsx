import "./App.css";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Card from "./components/Card/Card.jsx";
import Products from "./components/Products/Products.jsx";
import Categories from "./components/Categories/Categories.jsx";
import Brands from "./components/Brands/Brands.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import UserContextProvider from "./UserContext/UserContext.jsx";
import ProdectedRoute from "./components/ProdectedRoute/ProdectedRoute.jsx";
import ProductDetails from "./components/ProductDetails/productDetails.jsx";

import { Toaster } from "react-hot-toast";
import CheckOut from "./components/CheckOut/CheckOut";
import AllOrders from "./components/AllOrders/AllOrders.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WishList from "./components/WishList/WishList.jsx";
import WishListContextProvider from "./WishLIstContext/WishListContext.jsx";

import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import AuthenticationContextProvider from "./AuthenticationContext/AuthenticationContext.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import CartContextProvider from "./Cartcontext/Cartcontext.jsx";




function App() {
  let routers = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: (
            <ProdectedRoute>
              
              <Home />
            </ProdectedRoute>
          ),index:true,
        },
        {
          path: "cart",
          element: (
            <ProdectedRoute>
              <Card />
            </ProdectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProdectedRoute>
              <Products />
            </ProdectedRoute>
          ),
        },
        {
          path: "Categories",
          element: (
            <ProdectedRoute>
              <Categories />
            </ProdectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProdectedRoute>
              <Brands />
            </ProdectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProdectedRoute>
              <CheckOut />
            </ProdectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProdectedRoute>
              <WishList />
            </ProdectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProdectedRoute>
              <AllOrders />
            </ProdectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProdectedRoute>
              <ProductDetails />{" "}
            </ProdectedRoute>
          )

        },
        { path: "/register", element: <Register /> },
        { path: "/forgetPassword", element: <ForgetPassword /> },
        { path: "/login", element: <Login />  },
        { path: "/resetpassword" ,element:<ResetPassword/> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  const query = new QueryClient();

  return (
    <>
      <QueryClientProvider client={query}>
       <AuthenticationContextProvider>
       <CartContextProvider>
          <UserContextProvider>
            <WishListContextProvider>
              <RouterProvider router={routers}></RouterProvider>
              <Toaster />
            </WishListContextProvider>
          </UserContextProvider>
        </CartContextProvider>

       </AuthenticationContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
