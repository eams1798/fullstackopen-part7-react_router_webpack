import { IBlog } from "../interfaces/blog";
import { AppThunkDispatch } from "../interfaces/reducers";
import { likeBlog, removeBlog } from "../reducers/blogs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles/Blog.css";
import { loginResponse } from "../interfaces/login";

interface IBlogProps {
  id?: string;
  blog: IBlog;
  loginUser: loginResponse | null;
}

const Blog = ({ id, blog, loginUser }: IBlogProps) => {

  const dispatch = useDispatch<AppThunkDispatch>();
  const navigate = useNavigate();

  const remove = () => {
    navigate("/");
    void dispatch(removeBlog(blog));
  };
  return (
    <div id={id} className="blog">
      <ul className="blog-content">
        <h3>{blog.title}</h3>
        <li>Author: {blog.author}</li>
        <li>URL: {blog.url}</li>
        <li>
          Likes: {blog.likes}
          {loginUser ? (
            <button className="btn-like" onClick={() => void dispatch(likeBlog(blog))}>
              Like
            </button>
          ) : (
            <></>
          )}
          {blog.user?.username === loginUser?.username ? (
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
