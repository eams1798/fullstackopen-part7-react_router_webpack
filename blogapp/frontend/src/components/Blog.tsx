import { IBlog } from "../interfaces/blog";
import { IUser } from "../interfaces/user";
import { AppThunkDispatch } from "../interfaces/reducers";
import { setNotification, setAxiosErrorMessage } from "../reducers/notification";
import { likeBlog, removeBlog } from "../reducers/blogs";
import { isAxiosError } from "axios";
import { useDispatch } from "react-redux";
import Togglable from "./Togglable";

interface IBlogProps {
  id?: string;
  blog: IBlog;
  user: IUser | null;
}

const Blog = ({ id, blog, user }: IBlogProps) => {

  const dispatch = useDispatch<AppThunkDispatch>();

  const remove = () => {
    try {
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
    <div id={id}>
      <Togglable openButtonLabel="show" closeButtonLabel="hide">
        <h3 className="blog-title">
          {blog.title} by {blog.author}
        </h3>
        <>
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
        </>
      </Togglable>
    </div>
  );
};

export default Blog;
