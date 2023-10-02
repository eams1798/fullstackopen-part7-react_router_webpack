import { IBlog } from "../interfaces/blog";
import BlogForm from "./BlogForm";
import Blog from "./Blog";
import Togglable from "./Togglable";
import { useDispatch, useSelector } from "react-redux";
import { AppState, AppThunkDispatch } from "../interfaces/reducers";
import { loginResponse } from "../interfaces/login";
import { logout } from "../reducers/loginUser";

interface UIProps {
  user: loginResponse | null;
}

const UserInterface = ({ user }: UIProps) => {
  const blogs = useSelector<AppState, IBlog[]>((state) => [...state.blogs].sort(
    (a, b) => b.likes! - a.likes!,
  ));
  const dispatch = useDispatch<AppThunkDispatch>();

  return (
    <div>
      {user ? (
        <>
          <p>{user.name} logged in</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
          <Togglable openButtonLabel="New blog">
            <></>
            <BlogForm />
          </Togglable>
        </>
      ) : (
        <></>
      )}
      <div id="blog-list">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default UserInterface;
