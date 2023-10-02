import { useEffect } from "react";
import { loginResponse } from "./interfaces/login";
import LoginForm from "./components/LoginForm";
import UserInterface from "./components/UserInterface";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { AppState, AppThunkDispatch } from "./interfaces/reducers";
import { initializeBlogs } from "./reducers/blogs";
import { loadLoginUser } from "./reducers/loginUser";

const App = () => {
  const dispatch = useDispatch<AppThunkDispatch>();

  const user = useSelector<AppState, loginResponse | null>((state) => state.loginUser);

  useEffect(() => {
    try {
      void dispatch(initializeBlogs());
    } catch {
      console.error;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(loadLoginUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {!user ? (
        <Togglable openButtonLabel="Login" isVisible>
          <></>
          <LoginForm />
        </Togglable>
      ) : (
        <></>
      )}
      <UserInterface user={user} />
    </div>
  );
};

export default App;
