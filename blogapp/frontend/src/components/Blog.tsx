import { IBlog } from "../interfaces/blog";
import { AppThunkDispatch } from "../interfaces/reducers";
import { likeBlog } from "../reducers/blogs";
import { useDispatch } from "react-redux";
import "./styles/Blog.css";
import { loginResponse } from "../interfaces/login";
import DeleteBlogBtn from "./DeleteBlogBtn";
import Comments from "./Comments";

interface IBlogProps {
  id?: string;
  blog: IBlog;
  loginUser: loginResponse | null;
}

const Blog = ({ id, blog, loginUser }: IBlogProps) => {

  const dispatch = useDispatch<AppThunkDispatch>();

  return (
    <div id={id} className="blog">
      <ul className="blog-content">
        <div className="blog-title-container">
          <h3>{blog.title}</h3>
          <DeleteBlogBtn blog={blog} loginUser={loginUser} />
        </div>
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
        </li>
      </ul>
      <Comments blogId={blog.id!} loginUser={loginUser} comments={blog.comments!}/>
    </div>
  );
};

export default Blog;
