
import './App.css';
import Topbar from "./components/Topbar"
import Home from "./components/pages/home/Home"

import Invoice from "./components/pages/Invoice/InvoiceList"
import Sidebar from "./components/sidebar/Sidebar"
import Customer  from './components/pages/customer/Customer';
import {BrowserRouter as Router,Route,Routes,} from "react-router-dom";
import CreateNewCustomer from './components/pages/customer/CreateNewCustomer';
import InvoiceList from './components/pages/Invoice/InvoiceList';
function App() {
  return (
   
    <Router>
    <Topbar />
    <div className="container">
      <Sidebar />
      <Routes>
        <Route  path="/" component={Home} />
        <Route path="/Invoice" component={Invoice} />
        <Route exact path="/InvoiceList" component={InvoiceList} />
        <Route path="/Customer" component={Customer} />

        <Route path="/CreateNewCustomer" component={CreateNewCustomer} />

      </Routes>
    </div>
  </Router>
    
      
   
  );
}

export default App;
