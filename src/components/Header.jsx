import { useContext } from "react";
import { Link, Navigate} from "react-router-dom";
import { Context } from "..";
import { toast } from "react-hot-toast";
import { server } from "..";
import axios from "axios";


const Header = () => {
  const { isAuthenticated,setIsAuthenticated ,loading, setLoading} = useContext(Context);

  const LogOutHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${server}/users/logout`,
        {
          withCredentials: true,
        }
      );
      // typing mistake while deploying api
      toast.success(data.messaeg);
      setIsAuthenticated(false);
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false)
    }
    if(!isAuthenticated) return <Navigate to={'/login'}/>
  };
  return (
    <nav className="header">
      <Link to={"/"} className="todo_name">
        My Todo
      </Link>
      <article>
        <Link to={"/"} className="link">
          Home
        </Link>
        <Link to={"/profile"} className="link">
          Profile
        </Link>
        {isAuthenticated ? (
          <button disabled={loading} onMouseDown={LogOutHandler} to={'/login'} className="button">
            Logout
          </button>
        ) : (
          <Link to={"/login"} className="button">
            Login
          </Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
