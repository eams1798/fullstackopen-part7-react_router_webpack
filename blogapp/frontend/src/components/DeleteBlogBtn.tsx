import { useDispatch } from "react-redux";
import { IBlog } from "../interfaces/blog";
import { loginResponse } from "../interfaces/login";
import { removeBlog } from "../reducers/blogs";
import { useNavigate } from "react-router-dom";
import { AppThunkDispatch } from "../interfaces/reducers";

interface IBlogProps {
  blog: IBlog;
  loginUser: loginResponse | null;
}

const DeleteBlogBtn = ({ blog, loginUser }: IBlogProps) => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const navigate = useNavigate();

  const remove = () => {
    navigate("/");
    void dispatch(removeBlog(blog));
  };

  if (!(blog.user?.username === loginUser?.username)) {
    return (
      <>
      </>
    );
  }
  return (
    <button className="btn-delete" onClick={() => void remove()}>
      Delete
    </button>
  );
};

export default DeleteBlogBtn;