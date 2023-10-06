import { useRef } from "react";
import { loginResponse } from "../interfaces/login";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../interfaces/reducers";
import { createCommentInBlog } from "../reducers/blogs";

interface ICommentFormProps {
  blogId: string;
  loginUser: loginResponse | null;
}

const CommentForm = ({ blogId, loginUser }: ICommentFormProps) => {
  const contentRef = useRef<HTMLInputElement>(null);
  const isAnonymousRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = contentRef.current!.value;
    const isAnonymous = isAnonymousRef.current!.checked;

    if (isAnonymous) {
      const comment = { content, blog: blogId };
      void dispatch(createCommentInBlog(comment));
    } else {
      const comment = { content: content, blog: blogId, user: loginUser! };
      void dispatch(createCommentInBlog(comment));
    }
    contentRef.current!.value = "";
  };

  const dispatch = useDispatch<AppThunkDispatch>();
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter your comment..." ref={contentRef}/>
      {loginUser?
        <input type="checkbox" ref={isAnonymousRef} name="anonymous" /> :
        <input type="checkbox" ref={isAnonymousRef} name="anonymous" checked disabled />}
      <label htmlFor="anonymous">Post as anonymous</label>
      <button>Submit</button>
    </form>
  );
};

export default CommentForm;