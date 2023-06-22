
import './App.css';
import Topbar from "./components/Topbar"
import Home from "./components/pages/home/Home"
import { Switch } from '@mui/material';
import Invoice from "./components/pages/Invoice/InvoiceList"
import Sidebar from "./components/sidebar/Sidebar"
import Customer  from './components/pages/Customer';
import {BrowserRouter as Router,Route,Routes,} from "react-router-dom";
import CreateNewCustomer from './components/pages/customer/CreateNewCustomer';
function App() {
  return (
   
    <Router>
    <Topbar />
    <div className="container">
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Invoice" component={Invoice} />
        <Route path="/Customer" component={Customer} />
        <Route path="/CreateNewCustomer" component={CreateNewCustomer} />

      </Switch>
    </div>
  </Router>
    
      
   
  );
}

export default App;
