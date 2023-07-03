
import './App.css';
import Topbar from "./components/Topbar"
import Home from "./pages/home/Home"
import Customer from'./pages/customer/Customer';
import Dashboard from './pages/dashboard/Dashboard';
import {BrowserRouter, RouterProvider} from "react-router-dom";
import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="home/" element={<Home />} />
          <Route path="Customer/" element={<Customer />} />
        </Routes>
      </BrowserRouter>
    </>
    
      
   
  );
}

export default App;
