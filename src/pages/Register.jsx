import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { server } from "..";
import axios from "axios";
import { Context } from "..";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated,setIsAuthenticated,loading, setLoading } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    console.log(name, email, password);
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
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
  if(isAuthenticated)  return <Navigate to={'/'}/>
  return (
    <div className="signup">
      <section>
        <h2>SignUp Page</h2>
        <form action="" onSubmit={submitHandler}>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            name="name"
            placeholder="Name"
            required
            className="name"
          />
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
            SignUp
          </button>
          <h4>Or</h4>
          <Link to={"/login"} className="sign">
            Login
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
