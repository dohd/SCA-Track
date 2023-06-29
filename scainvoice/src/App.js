
import './App.css';
import Topbar from "./components/Topbar"
import Home from "./pages/home/Home"

import Invoice from "./pages/Invoice/InvoiceList"
import Sidebar from "./components/sidebar/Sidebar"
import Customer  from './pages/customer/Customer';
import {BrowserRouter, RouterProvider} from "react-router-dom";
import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";

function App() {
  return (
   
    <Router>
    <Topbar />
    <div className="container">
      <Sidebar />
      <div className="container mt-5 text-center">
      <BrowserRouter>
        <nav>
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="customers">
            Customers
          </Link>
        </nav>
      <Routes>
        <Route  path="/" component={Home} />
        <Route path="/Invoice" component={Invoice} />
        
        <Route path="/Customer" component={Customer} />

      

      </Routes>
      </BrowserRouter>
      </div>
    </div>
  </Router>
    
      
   
  );
}

export default App;
