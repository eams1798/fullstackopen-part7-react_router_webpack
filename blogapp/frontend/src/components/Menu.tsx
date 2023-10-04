import { Link } from "react-router-dom";
import { loginResponse } from "../interfaces/login";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../interfaces/reducers";
import { logout } from "../reducers/loginUser";

interface IMenuProps {
  user: loginResponse | null
}
const Menu = ({ user }: IMenuProps) => {
  const dispatch = useDispatch<AppThunkDispatch>();

  return (
    <div className="menu">
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      {user ? (
        <>
          <div className="login-info">
            <p>{user.name} logged in</p>
            <button onClick={() => dispatch(logout())}>Logout</button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Menu;