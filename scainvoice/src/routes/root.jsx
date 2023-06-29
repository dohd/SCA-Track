import Topbar from "../components/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import React from "react";
import {Outlet} from "react-router-dom";


export default function Root() {
    return (
        <>
            <Topbar/>
            <div className="container">
                <Sidebar/>
                {/*    /!* outlet is where children will be rendered *!/*/}
                
                <Outlet/>
            </div>
        </>
    );
}
