import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context } from '..';
import axios from 'axios';
import { server } from '..';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated,setIsAuthenticated,loading, setLoading } = useContext(Context);
  if(isAuthenticated)  return <Navigate to={'/'}/>

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };
  return (
    <div className='login'>
      <section>
      <h2>Login Page</h2>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            required
            className="email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
            required
            className="password"
          />
          <button onClick={submitHandler} disabled={loading} type="submit" className="loginbtn">
          Login
          </button>
          <h4>Or</h4>
          <Link to={"/signup"} className="sign">
            SignUp
          </Link>
        </form>
      </section>
    </div>
  )
}

export default Login