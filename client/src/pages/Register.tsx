import React, { Fragment, useEffect, useState, useContext} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { register } from "../service";
import { UserContext } from "../context/UserState";

export const Register = () => {

    const {token, setToken} = useContext(UserContext);
    const [data, setData] = useState({name: "",email: "", password: "", password2: ""});
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const clickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data.email !== '' && data.password !== '' && data.password2!== '' && data.name !== ''){
            if (data.password !== data.password2) {
                setError("Passwords don't match");
            }
            else {
                const res = await register(data);
                console.log(res);
                if (res.status === "success") {
                    setToken(localStorage.token);
                    navigate("/home");
                }
                else {
                    setError(res.errorMsg);
                }     
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
            <input type='email' placeholder='Email Address' name='email' value={data.email} onChange={e => change(e)}/>
            <input type='text' placeholder='Username (5-15 characters)' name='name' value={data.name} onChange={e => change(e)}/>
            <input type='password' placeholder='Password' name='password' value={data.password} onChange={e => change(e)}/>
            <input type= 'password' placeholder='Confirm password' name='password2' value={data.password2} onChange={e => change(e)}/>
            <button type='submit'>Register</button>
            </form>
            <p style={{color: 'red'}}>{error}</p>
            <p>
            Already have an account? <Link to='/login'>Login</Link>
            </p>
        </div>  
    )
}