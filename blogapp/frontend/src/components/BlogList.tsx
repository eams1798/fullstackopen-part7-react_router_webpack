import { useSelector } from "react-redux";
import { AppState } from "../interfaces/reducers";
import { IBlog } from "../interfaces/blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector<AppState, IBlog[]>((state) => [...state.blogs].sort(
    (a, b) => b.likes! - a.likes!,
  ));

  return (
    <div id="blog-list">
      <Togglable openButtonLabel="New blog">
        <></>
        <BlogForm />
      </Togglable>
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