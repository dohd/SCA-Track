import Topbar from "../components/Topbar";
import Dashboard from "../pages/dashboard/Dashboard";
import Sidebar from "../components/sidebar/Sidebar";
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
