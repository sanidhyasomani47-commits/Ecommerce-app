import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
  const [currentstate , setcurrentstate]=useState('Login')
  const {token,setToken,navigate,backendurl}=useContext(ShopContext)
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
  const onsubmithandler=async(e)=>{
       e.preventDefault()
       try {
        if(currentstate=== "Sign Up"){
          const response=await axios.post(backendurl+'api/user/register',{name,password,email})
          if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          }
          else{
            toast.error(response.data.message)
          }
        }
        else{
          const response=await axios.post(backendurl+'api/user/login',{password,email})
          console.log(response.data)
          if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          }
          else{
            toast.error(response.data.message)
          }
        }

       } catch (error) {
        toast.error(error.message)
       }
  }
  useEffect(()=>{
        if(token){
          navigate('/')
        }
  },[token])
  return (
   <form onSubmit={onsubmithandler} className='flex flex-col items-center sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
    <div className='inline-flex items-center gap-2 mb-2 mt-10'>
      <p className='prata-regular text-3xl'>{currentstate}</p>
      <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
    </div>
    {currentstate==='Login'?'':<input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name'  className='w-full px-3 py-2 border border-gray-800'  required/>}
    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email' className='w-full px-3 py-2 border border-gray-800' required/>
    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='w-full px-3 py-2 border border-gray-800' required/>
    <div className='w-full flex justify-between text-sm mt-[-8px]'>
      <p>Forgot your password?</p>
      {
        currentstate==='Login'?
        <p onClick={()=>setcurrentstate('Sign Up')} className='cursor-pointer'>Create account</p>:
        <p onClick={()=>setcurrentstate('Login')}  className='cursor-pointer'>Login Here</p>
      }
    </div>
    <button className='bg-black text-white font-light px-8 py-2 mt-4 text-sm'>{currentstate==='Login'?'Sign in':'Sign Up'}</button>
   </form>
  )
}

export default Login