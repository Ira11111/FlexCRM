import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from './pages/home/Home.tsx'
import Crm from "./pages/crm/Crm.tsx";
import Statistic from "./components/crm/Statistic.tsx";
import CustomersList from "./components/crm/customers/CustomersList.tsx";
import Customer from "./components/crm/customers/Customer.tsx";
import CustomerForm from "./components/crm/customers/CustomerForm.tsx";
import AdsList from "./components/crm/ads/AdsList.tsx";
import Ad from "./components/crm/ads/Ad.tsx";
import AdForm from "./components/crm/ads/AdForm.tsx";
import Contract from "./components/crm/Contract.tsx";
import ContractsList from "./components/crm/ContractsList.tsx";
import Product from "./components/crm/products/Product.tsx";
import ProductsList from "./components/crm/products/ProductsList.tsx";
import ProductForm from "./components/crm/products/ProductForm.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import Register from "./pages/myAuth/Register.tsx"
import Login from "./pages/myAuth/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {PaginationProvider} from "./context/PaginationContext.tsx";


function Logout() {
  localStorage.clear();
  return <Navigate to="/"/>
}

function RegisterAndLogout(props: {mode: string}) {
  localStorage.clear();
  return <Register mode = {props.mode}/>
}

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>

          <Route path="/login" element={<Login />}/>
          <Route path="/register"  element={<RegisterAndLogout mode ={'register'} />}/>
          <Route path="/logout" element={<Logout />}/>




          <Route path="crm" element={
            <ProtectedRoute>
               <Crm/>
            </ProtectedRoute>
            }>

            <Route index element={<Statistic/>}/>

            <Route path={'createUser'} element={<Register mode={'create'}/>}/>


              <Route path="customers" element={<PaginationProvider initialEndpoint={'/api/customers/'}/>}>
                <Route index element={<CustomersList/>}/>
                <Route path=":customerId" element={<Customer/>}/>
                <Route path=":customerId/edit" element={<CustomerForm/>}/>
                <Route path="create" element={<CustomerForm/>}/>
              </Route>


              <Route path="ads"
                     element={<PaginationProvider initialEndpoint={'/api/adds/'}/>}>
                <Route index element={<AdsList/>} />
                <Route path=":adId" element={<Ad/>}/>
                <Route path=":adId/edit" element={<AdForm/>}/>
                <Route path="create" element={<AdForm/>}/>
              </Route>




              <Route path="products"
                     element={<PaginationProvider initialEndpoint={'/api/products/'}/>}>
                <Route index element={<ProductsList/>}/>
                <Route path=":productId" element={<Product/>}/>
                <Route path=":productId/edit" element={<ProductForm/>}/>
                <Route path="create" element={<ProductForm/>}/>
              </Route>





              <Route  path="contracts"
                      element={<PaginationProvider initialEndpoint={'/api/contracts/'}/>} >
                <Route index element={<ContractsList/>}/>
                <Route path=":contractId" element={<Contract/>}/>
                {/*<Route path=":contractId/edit" element={<ContractForm/>}/>*/}
                {/*<Route path="create" element={<ContractForm/>}/>*/}
              </Route>









          </Route>

          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
