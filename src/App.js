import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import AdminHome from './adminpages/AdminHome';
import { useEffect } from 'react';
import AdminItem from './adminpages/AdminItem';
import AdminCategory from './adminpages/AdminCategory';
import AdminStock from './adminpages/AdminStock';
import AdminCustomer from './adminpages/AdminCustomer';
import AdminOrder from './adminpages/AdminOrder';
import AdminRegister from './adminpages/auth/AdminRegister';
import AdminLogin from './adminpages/auth/AdminLogin';
import CustomerLogin from './customerpadges/auth/CustomerLogin';
import CustomerRegister from './customerpadges/auth/CustomerRegister';
import Home from './customerpadges/Home';
import AdminProtectedRoutes from './utils/AdminProtectedRoutes';
import CustomerProtectedRoutes from './utils/CustomerProtectedRoutes';

function App() {

  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<AdminProtectedRoutes/>}>
            <Route path='/admin' element={<AdminHome/>}/>
            <Route path='/admin/items' element={<AdminItem/>}/>
            <Route path='/admin/categories' element={<AdminCategory/>}/>
            <Route path='/admin/stocks' element={<AdminStock/>}/>
            <Route path='/admin/customers' element={<AdminCustomer/>}/>
            <Route path='/admin/orders' element={<AdminOrder/>}/>
          </Route>
          


          <Route path='/admin/register' element={<AdminRegister/>}/>
          <Route path='/admin/login' element={<AdminLogin/>}/>

          <Route element={<CustomerProtectedRoutes/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/customerlogin' element={<CustomerLogin/>}/>
          </Route>


          <Route path='/customerlogin' element={<CustomerLogin/>}/>
          <Route path='/customerRegister' element={<CustomerRegister/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
