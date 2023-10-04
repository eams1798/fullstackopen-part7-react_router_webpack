import { IBlog } from "../interfaces/blog";
import { IUser } from "../interfaces/user";
import { AppThunkDispatch } from "../interfaces/reducers";
import { setNotification, setAxiosErrorMessage } from "../reducers/notification";
import { likeBlog, removeBlog } from "../reducers/blogs";
import { isAxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles/Blog.css";

interface IBlogProps {
  id?: string;
  blog: IBlog;
  user: IUser | null;
}

const Blog = ({ id, blog, user }: IBlogProps) => {

  const dispatch = useDispatch<AppThunkDispatch>();
  const navigate = useNavigate();

  const remove = () => {
    try {
      navigate("/");
      void dispatch(removeBlog(blog));
      dispatch(setNotification({
        type: "ok",
        message: `Blog ${blog.title} by ${blog.author || ""} deleted succesfully`
      }));
    } catch (error) {
      if (isAxiosError(error)) {
        dispatch(setAxiosErrorMessage(error));
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div id={id} className="blog">
      <ul className="blog-content">
        <h3>{blog.title}</h3>
        <li>Author: {blog.author}</li>
        <li>URL: {blog.url}</li>
        <li>
          Likes: {blog.likes}
          {user ? (
            <button className="btn-like" onClick={() => void dispatch(likeBlog(blog))}>
              Like
            </button>
          ) : (
            <></>
          )}
          {blog.user?.username === user?.username ? (
            <button className="btn-delete" onClick={() => void remove()}>
              Delete
            </button>
          ) : (
            <></>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Blog;
