import { Link } from "react-router-dom";
import { IUser } from "../interfaces/user";

const User = ({ user }: { user: IUser }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs!.map((blog) => (
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default User;