import './App.css';
import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Companies } from './pages/Companies';
import { Products } from './pages/Products';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Navbar } from './Navbar';
import setAuthToken from './setAuthToken';
import { PrivateRoute } from './PrivateRoute';
import { UserProvider } from './context/UserState';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <Fragment>
    <UserProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={ <Navigate to="/login" /> }/>
      <Route path='/register' element={<Register />} />
      <Route path= '/login' element={<Login/>}/>
      <Route path='/home' element={<PrivateRoute><Home/></PrivateRoute>}/>
      <Route path='/companies' element={<PrivateRoute><Companies/></PrivateRoute>}/>
      <Route path='/products' element={<PrivateRoute><Products/></PrivateRoute>}/>
    </Routes>
    </BrowserRouter>
    </UserProvider>
    </Fragment>
  );
}

export default App;
