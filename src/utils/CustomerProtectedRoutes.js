import axios from "axios";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const CustomerProtectedRoutes = () =>{

    const navigate = useNavigate();


    const token = localStorage.getItem("token");

    if(!token){
        navigate("/login")
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return <Outlet/>
}

export default CustomerProtectedRoutes;