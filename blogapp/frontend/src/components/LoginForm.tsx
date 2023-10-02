import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAxiosErrorMessage } from "../reducers/notification";
import { AppThunkDispatch } from "../interfaces/reducers";
import { login } from "../reducers/loginUser";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch<AppThunkDispatch>();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      void dispatch(login({ username, password }));
      setUsername("");
      setPassword("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setAxiosErrorMessage(error));
      } else {
        console.log(error);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        void handleLogin(e);
      }}
    >
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="btn-login" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
