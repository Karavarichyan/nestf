import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { useAppDispatch } from './store/hooks';
import { getTokenFromLocalStorage } from './helper/localstorage.helper';
import { AuthServices } from './services/auth.services';
import { Login, Logout } from './store/user/userSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch()
  const checkAuth = async () => {
    const token = getTokenFromLocalStorage()
    try{
      if(token){
        const data = await AuthServices.getProfile()
        if (data){
          dispatch(Login(data))
        } else{
          dispatch(Logout())
        }
      }
    }catch(error)
    {
      console.log('error')
    }
  }
  useEffect(()=>{
    checkAuth()
  },[])
  return <RouterProvider router={router} />;
}

export default App;
