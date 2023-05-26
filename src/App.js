import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Toaster, toast} from 'react-hot-toast'


import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Header from './components/Header'

// scss files
import './style/AddTask.scss'
import './style/app.scss'
import './style/Header.scss'
import './style/login.scss'
import './style/signup.scss'
import './style/Loading.scss'
import { useContext, useEffect } from 'react'
import axios from 'axios'
import { Context, server } from '.'

function App() {
  const {setUser,setIsAuthenticated,setLoading} = useContext(Context);

 useEffect(()=>{
    setLoading(true)
    axios.get(`${server}/users/me`,{
      withCredentials:true
    }).then((res)=>{
      setUser(res.data.user)
      setIsAuthenticated(true);
      setLoading(false);
    }).catch((error)=>{
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    })
  },[])
  return (
    <div>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
    <Toaster/>
    </div>
  )
}

export default App
