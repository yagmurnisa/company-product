import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import setAuthToken from './setAuthToken';
import { UserContext } from "./context/UserState";

export const Navbar = () => {
  const {token, setToken} = useContext(UserContext);
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthToken(null);
  }

  if (token) {
    return (
      <div className='navbar'>
        <ul> 
          <li>
            <Link className='navLink' style={{textDecoration: 'none'}} to='/home'>Home</Link>
          </li>
          <li>
            <Link className='navLink'  style={{textDecoration: 'none'}} to='/companies'>Companies</Link>
          </li>
          <li>
            <Link className='navLink'  style={{textDecoration: 'none'}} to='/products'>Products</Link>
          </li>
          <li>
            <a className='navLink' style={{textDecoration: 'none'}} onClick={logout} href='#!'>Log out</a>
          </li>
        </ul>
      </div>
    )
  }
    return (
      <div className='navbar'>
        <ul> 
          <li>
            <Link className='navLink' style={{textDecoration: 'none'}} to='/login'>Login</Link>
          </li>
          <li>
            <Link className='navLink'  style={{textDecoration: 'none'}} to='/register'>Register</Link>
          </li>
        </ul>
      </div>
    )
}