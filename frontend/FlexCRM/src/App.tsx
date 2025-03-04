import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from './pages/home/Home.tsx'
import Crm from "./pages/crm/Crm.tsx";
import Statistic from "./components/crm/Statistic.tsx";
import CustomersList from "./components/crm/CustomersList.tsx";
import Customer from "./components/crm/Customer.tsx";
import Lead from "./components/crm/Lead.tsx";
import LeadsList  from "./components/crm/LeadsList.tsx";
import AdsList from "./components/crm/AdsList.tsx";
import Ad from "./components/crm/Ad.tsx";
import Contract from "./components/crm/Contract.tsx";
import ContractsList from "./components/crm/ContractsList.tsx";
import Product from "./components/crm/Product.tsx";
import ProductsList from "./components/crm/ProductsLIst.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import Register from "./pages/myAuth/Register.tsx"
import Login from "./pages/myAuth/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

function Logout() {
  localStorage.clear();
  return <Navigate to="/"/>
}

function RegisterAndLogout(){
  localStorage.clear();
  return <Register />
}

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>

          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<RegisterAndLogout />}/>
          <Route path="/logout" element={<Logout />}/>


          <Route path="crm" element={
            <ProtectedRoute>
              <Crm/>
            </ProtectedRoute>
            }>
            <Route index element={<Statistic/>}/>

            <Route path="customers" element={<CustomersList/>}>
              <Route path=":customerId" element={<Customer/>}/>
            </Route>

            <Route path="leads" element={<LeadsList/>}>
              <Route path=":leadId" element={<Lead/>}/>
            </Route>

            <Route path="ads" element={<AdsList />}>
              <Route path=":adId" element={<Ad/>}/>
            </Route>


            <Route path="products" element={<ProductsList/>}>
              <Route path=":productId" element={<Product/>}/>
            </Route>


            <Route path="contracts" element={<ContractsList/>}>
              <Route path=":contractId" element={<Contract/>}/>
            </Route>
          </Route>

          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
