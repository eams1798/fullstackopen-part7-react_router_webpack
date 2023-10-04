import { IBlog } from "../interfaces/blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";
import { loginResponse } from "../interfaces/login";

interface IBlogListProps {
  loginUser: loginResponse | null;
  blogs: IBlog[];
}

const BlogList = ({ loginUser, blogs }: IBlogListProps) => {
  return (
    <div id="blog-list">
      {loginUser?
        <Togglable openButtonLabel="New blog">
          <></>
          <BlogForm />
        </Togglable>
        : <></>}
      {blogs.map((blog) => (
        <div key={blog.id} id={blog.id} className="blog" >
          <h3 className="blog-title">
            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default BlogList;