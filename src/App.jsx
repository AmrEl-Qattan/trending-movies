import React, { useEffect, useState } from "react";
import "./App.css";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Movies from "./components/Movies/Movies";
import TvShow from "./components/TvShow/TvShow";
import People from "./components/People/People";
import ItemDetails from "./components/ItemDetails/ItemDetails";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import { jwtDecode } from "jwt-decode";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

export default function App() {

  

// get user token
const [userData, setUserData] = useState(null)

useEffect(()=>{
  if(localStorage.getItem("userToken") !== null){
    saveUserData()
  }

},[])
function saveUserData(){
  let encodedToken = localStorage.getItem("userToken");
  let decodedToken = jwtDecode(encodedToken);
  setUserData(decodedToken);
}


// routers
let routers = createHashRouter([
  {path: "",element: <Layout userData={userData} setUserData={setUserData}/>,children: [
    {path:"home", element:<ProtectedRoutes><Home /></ProtectedRoutes>  },
    {path:"trending-movie", element:<ProtectedRoutes><Home /></ProtectedRoutes>  },
    {index:true, element:<ProtectedRoutes><Home /></ProtectedRoutes>  },
    {path:"movies" , element:<ProtectedRoutes><Movies/></ProtectedRoutes> },
    {path:"tvshow" , element:<ProtectedRoutes><TvShow/></ProtectedRoutes> },
    {path:"people" , element:<ProtectedRoutes><People/></ProtectedRoutes> },
    {path:"itemdetails/:id/:mediaType" , element:<ProtectedRoutes><ItemDetails/></ProtectedRoutes> },
    {path:"login" , element: <Login saveUserData={saveUserData}/>},
    {path:"register" , element: <Register/>},
    {path:"*" , element: <NotFound/>},
  ],
  },
]);

  return <RouterProvider router={routers}></RouterProvider>;
}
