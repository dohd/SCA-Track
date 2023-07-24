
import Dashboard from "../pages/dashboard/Dashboard";
import Register from "../components/authentification/Register";
import React from "react";
import {Outlet} from "react-router-dom";
import Login from "../components/authentification/Login";


export default function Root() {
    return (
        <>
         <Register/>
          
            <div className="container">
               
                {/*  <Topbar/> <Sidebar/>  /!* outlet is where children will be rendered *!/*/}
              
                <Outlet/>
            </div>
        </>
    );
}
