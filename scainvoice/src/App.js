
import './App.css';
import Invoice from './pages/Invoice/Invoice'
import CreateInvoice from './pages/Invoice/CreateInvoice'
import DispatchedInvoice from './pages/Invoice/DispatchedInvoice'
import InvoiceList from './pages/Invoice/InvoiceList'
import Home from "./pages/home/Home"
import CreateNewCustomer from './pages/customer/CreateNewCustomer'
import Dashboard from './pages/dashboard/Dashboard';
import {BrowserRouter, RouterProvider} from "react-router-dom";
import {BrowserRouter as Router,Route,Routes,Outlet} from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="home/" element={<Home />} />
          <Route path='/CreateNewCustomer' element={<CreateNewCustomer/>}/>
          <Route path="/newLpo" element={<newLpo />} />
          <Route path="/lpoRecord" element={<lpoRecord />} />
          <Route path="invoice" element={<Invoice />}>
          <Route path="list" element={<InvoiceList />} />
          <Route path="dispatched" element={<DispatchedInvoice />} />
         <Route path="create" element={<CreateInvoice />} />
      </Route>
        </Routes>
      </BrowserRouter>
      <Outlet />
    </>
    
      
   
  );
}

export default App;
