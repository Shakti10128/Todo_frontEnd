import React, { useContext } from 'react'
import AddTask from '../components/AddTask'
import { Context } from '..';


const Home = () => {
  const { isAuthenticated} = useContext(Context);
  return (
    <>
    {
      !isAuthenticated? <h1>{"Please Login To See Todo 😊"}</h1>:<AddTask/>
    }
    </>
  )
}

export default Home