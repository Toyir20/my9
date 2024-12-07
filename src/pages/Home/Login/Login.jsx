import React, { useEffect, useState } from 'react'
import image from "../../../../public/login-image.svg"
import "../Login/Login.css"
import { baseUrl } from '../../../constants/base-url'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")

  const onchangeNumber = (e) => {
    setPhoneNumber(e.target.value)
  }
  const onchangePasword = (e) => {
    setPassword(e.target.value)
  }

  const submitLogin = () => {
    axios.post(`${baseUrl}users/login`, {
      "phone_number": phoneNumber,
      "password": password
    })
      .then(function (response) {
        console.log(response)
        const accessToken = response.data.data.access; // Tokenni responsedan olish
        localStorage.setItem("token", accessToken); // Tokenni localStorage'ga saqlash
        response.data.success && navigate('/profile')
        location.reload()
      })
      .catch(function (error) {
        console.error("Login xatosi:", error);
      });
  }

  return (
    <div className='container'>
      <div className='login-form'>
        <div className="login-input">

          <input onChange={onchangeNumber} value={phoneNumber} className='login-number ' type="text" placeholder='phone number' />
          <input onChange={onchangePasword} value={password} className='login-password' type="password" placeholder='password' />
          <button onClick={submitLogin} className=" input-submit relative hidden lg:inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[2px] focus:outline-none">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#007f7f_0%,#009494_50%,#00b3b3_100%)]"></span>
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-transparent px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
              SUBMIT
            </span>
          </button>
        </div>
      </div>
      <div className='login-image'>
        <img src={image} alt="" />
      </div>
    </div>
  )
}

export default Login