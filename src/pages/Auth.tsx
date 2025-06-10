import React, { useState, type FC } from 'react'
import { toast } from 'react-toastify'
import { AuthServices } from '../services/auth.services'
import { setTokenToLocalStorage } from '../helper/localstorage.helper'
import { useAppDispatch } from '../store/hooks'
import { Login } from '../store/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Auth: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispach = useAppDispatch()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState<boolean>(false)


  const LoginoHendler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  try {
    e.preventDefault()
    const data =await AuthServices.Login({email,password})
    if(data){
      setTokenToLocalStorage('token', data.token)
      dispach(Login(data))
      toast.success('You logged id')
      navigate('/')
    }
  } catch (err: any) {
    const error = err.response?.data.message
    toast.error(error?.toString() || 'Unknown error')
  }
}

const registratinoHendler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  try {
    const data = await AuthServices.registration({ email, password })
    if (data) {
      toast.success('Account has been created')
      setIsLogin(!isLogin)
    }
  } catch (err: any) {
    const error = err.response?.data.message
    toast.error(error?.toString() || 'Unknown error')
  }
}
  return (
    <div className="mt-40 flex flex-col justify-center items-center bg-slate-800 text-white">
      <h1 className="text-center text-xl mb-10">
        {isLogin ? 'Login' : 'Registration'}
      </h1>
      <form
        onSubmit={isLogin ? LoginoHendler : registratinoHendler}
        className="flex w-1/3 flex-col mx-auto gap-5"
      >
        <input
          onChange={e => setEmail(e.target.value)}
          type="text"
          className="px-4 py-2 rounded-md bg-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="Email"
        />
        <input
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="px-4 py-2 rounded-md bg-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="password"
        />
        <button className="btn-green mx-auto">Submit</button>
      </form>
      <div className="flex justify-center mt-5">
        {isLogin ? (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className=" text-slate-300"
          >
            {' '}
            You don`t have an account?
          </button>
        ) : (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className=" text-slate-300"
          >
            {' '}
            Already have an account
          </button>
        )}
      </div>
    </div>
  )
}

export default Auth
