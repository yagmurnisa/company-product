import React, { useState, Fragment, useEffect, useContext, MouseEvent, FormEvent, ChangeEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../service";
import { UserContext } from "../context/UserState";

export const Login = () => {
    const {token, setToken} = useContext(UserContext);
    const navigate = useNavigate();
    const [data, setData] = useState({name: "", password: ""});
    const [error, setError] = useState('');

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const clickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data.name.trim() !== '' && data.password.trim() !== ''){
           let res = await login(data)
           console.log(res);
           if (res?.status === "success") {
            setToken(localStorage.token);
            navigate("/home");
          }
           else {
           setError(res?.errorMsg);
          }
        }
        else {
            setError("Please fill all fields");
        }
    };

    if (token) {
        return <Navigate to='/home' />;
    };
    
    return (
        <div className='loginForm'>      
            <h1>Sign in</h1>
            <form onSubmit={e => clickSubmit(e)}>
            <input type='text' placeholder='Username' name='name' value={data.name} onChange={e => change(e)}/>
            <input type='password' placeholder='Password' name='password' value={data.password} onChange={e => change(e)}/>
            <button className='btn' type='submit'>Login</button>
            </form>
            <p style={{color: 'red'}}>{error}</p>
            <p>
            Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </div>  
    )
}