
import './App.css';
import Topbar from "./components/Topbar"
import Home from "./components/pages/home/Home"
import Invoice from "./components/pages/Invoice/Invoice"
import Sidebar from "./components/sidebar/Sidebar"
import Customer  from './components/pages/Customer';
import {BrowserRouter as Router,Route,Routes,} from "react-router-dom";
function App() {
  return (
   
     <Router>
        <Topbar/>
        <div className="container">
          <Sidebar/>
          <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/Invoice" element={<Invoice/>}/>
          <Route  path="/Customer" element={<Customer/>}/>
          </Routes>
          </div>
     
    
      
     </Router>
  );
}

export default App;
