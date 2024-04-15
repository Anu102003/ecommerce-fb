import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login, logout } from '../../Redux/Action';
import "./_signIn.scss"
import { basic } from '../../images';
import { loginApi } from '../../Api/Api';
export const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    const handelSignIn = async () => {
        try {
            const userData = await loginApi(email, password);
            dispatch(login({ email: email, token: userData }));
            navigate("/home");
        } catch (error) {
            alert(error.message + " : Please enter correct email and password")
        }
    }
    return (
        <div className='signin'>
            <div className='signin__left'>
                <div className='signin-container'>
                    <div className='signin-logo'>
                        <img src={basic.logo} />
                    </div>

                    <input type='text' value={email} placeholder='Enter email' onChange={(e) => { setEmail(e.target.value) }} /><br />
                    <input type='text' value={password} placeholder='Enter email' onChange={(e) => { setPassword(e.target.value) }} /><br />
                    <button onClick={handelSignIn}>Login</button>
                </div>
            </div>
            <div className='signin__right'>
                <img src={basic.signinShopping} />
            </div>
        </div>
    )
}

