import './App.css';
import Topbar from "./components/Topbar"
import Sidebar from "./components/sidebar/Sidebar"
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";

function App() {
    return (

        <Router>
            <Topbar/>
            <div className="container">
                <Sidebar/>
                {/*<Routes>*/}
                {/*    <Route path="/" component={Home}/>*/}
                {/*    <Route path="/Invoice" component={Invoice}/>*/}
                {/*    <Route exact path="/InvoiceList" component={InvoiceList}/>*/}
                {/*    <Route path="/Customer" component={Customer}/>*/}

                {/*    <Route path="/CreateNewCustomer" component={CreateNewCustomer}/>*/}

                {/*</Routes>*/}
            </div>
        </Router>


    );
}

// <ArrowBackIcon style={{transform: open ? 'rotate(0deg)' : 'rotate(180deg)'}}/>

export default App;
