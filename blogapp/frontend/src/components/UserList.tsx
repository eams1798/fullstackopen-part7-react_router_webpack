import { useSelector } from "react-redux";
import { AppState } from "../interfaces/reducers";
import { IUser } from "../interfaces/user";
import { Link } from "react-router-dom";

const UserList = () => {
  const users = useSelector<AppState, IUser[]>((state) => [...state.users]);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <Link to={`/users/${user.id}`}>
                <td>{user.name}</td>
              </Link>
              <td>{user.blogs!.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;