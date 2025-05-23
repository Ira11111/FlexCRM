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
import Contract from "./components/crm/contracts/Contract.tsx";
import ContractsList from "./components/crm/contracts/ContractsList.tsx";
import Product from "./components/crm/products/Product.tsx";
import ProductsList from "./components/crm/products/ProductsList.tsx";
import ProductForm from "./components/crm/products/ProductForm.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import Register from "./pages/myAuth/Register.tsx"
import Login from "./pages/myAuth/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ContractForm from "./components/crm/contracts/ContractForm.tsx";
import UsersList from "./components/crm/users/UsersList.tsx";
import {ROLE} from "./constants.ts";
import User from "./components/crm/users/User.tsx";
import Main from  './components/home/Main.tsx'
import About from './components/home/About.tsx'



function Logout() {
  localStorage.clear();
  return <Navigate to="/"/>
}

function RegisterAndLogout(props: {mode: string}) {
  localStorage.clear();
  return <Register mode = {props.mode}/>
}

function Users(props:{prm:boolean}) {
  return props?<UsersList/>:<Statistic/>
}

function App() {
  const prm = localStorage.getItem(ROLE) === "Admins";

  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Home/>}>
            <Route index element={<Main/>}/>
            <Route path={'about'} element={<About/>}/>
          </Route>

          <Route path="/login" element={<Login />}/>
          <Route path="/register"  element={<RegisterAndLogout mode ={'register'} />}/>
          <Route path="/logout" element={<Logout />}/>




          <Route path="crm" element={
            <ProtectedRoute>
               <Crm/>
            </ProtectedRoute>
            }>

            <Route index element={<Statistic/>}/>

              <Route path={'users'}>
                <Route index element={<Users prm={prm}/>}/>
                <Route path={':userId'} element={<User/>}/>
                <Route path={'create'} element={<Register mode={'create'}/>}/>
              </Route>

              <Route path="customers">
                <Route index element={<CustomersList/>} />
                <Route path=":customerId" element={<Customer/>}/>
                <Route path=":customerId/contracts" element={<ContractsList/>}/>
                <Route path=":customerId/products" element={<ProductsList/>}/>
                <Route path=":customerId/edit" element={<CustomerForm/>}/>
                <Route path="create" element={<CustomerForm/>}/>
              </Route>


              <Route path="ads">
                <Route index element={<AdsList/>} />
                <Route path=":adId" element={<Ad/>}/>
                <Route path=":adId/edit" element={<AdForm/>}/>
                <Route path=":adId/customers" element={<CustomersList/>}/>
                <Route path="create" element={<AdForm/>}/>
              </Route>




              <Route path="products">
                <Route index element={<ProductsList/>}/>
                <Route path=":productId" element={<Product/>}/>
                <Route path=":productId/edit" element={<ProductForm/>}/>
                <Route path=":productId/ads" element={<AdsList/>}/>
                <Route path="create" element={<ProductForm/>}/>
              </Route>





              <Route path="contracts">
                <Route index element={<ContractsList/>} />
                <Route path=":contractId" element={<Contract/>}/>
                <Route path=":contractId/edit" element={<ContractForm/>}/>
                <Route path="create" element={<ContractForm/>}/>
              </Route>
          </Route>

          <Route path="*" element={<NotFound/>} />

        </Routes>
      </BrowserRouter>
  )
}

export default App
