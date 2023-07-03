
import Dashboard from "../pages/dashboard/Dashboard";

import React from "react";
import {Outlet} from "react-router-dom";


export default function Root() {
    return (
        <>
           
            <Dashboard/>
            <div className="container">
               
                {/*  <Topbar/> <Sidebar/>  /!* outlet is where children will be rendered *!/*/}
                
                <Outlet/>
            </div>
        </>
    );
}
