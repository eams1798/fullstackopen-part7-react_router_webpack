import { IComment } from "../interfaces/comment";
import { loginResponse } from "../interfaces/login";
import { IUser } from "../interfaces/user";
import DeleteCommentBtn from "./DeleteCommentBtn";

interface ICommentProps {
  blogId: string;
  comment: IComment;
  loginUser: loginResponse | null;
  commentUsers: IUser[];
}

const Comment = ({ blogId, comment, loginUser, commentUsers }: ICommentProps) => {
  if (!comment.user || commentUsers.length === 0) {
    return (
      <li key={comment.id} className="comment">
        <p>{comment.content}</p>
      </li>
    );
  }
  if ( typeof comment.user !== "string") {
    return (
      <li key={comment.id} className="comment">
        <p>{comment.content}</p>
        <b>Added by {comment.user?.name}</b>
        <DeleteCommentBtn blogId={blogId} comment={comment} loginUser={loginUser} />
      </li>
    );
  }
  const user = commentUsers.find((user) => user.id === comment.user);
  return (
    <li key={comment.id} className="comment">
      <p>{comment.content}</p>
      <b>Added by {user!.name}</b>
      <DeleteCommentBtn blogId={blogId} comment={{
        ...comment,
        user
      }} loginUser={loginUser} />
    </li>
  );
};

export default Comment;