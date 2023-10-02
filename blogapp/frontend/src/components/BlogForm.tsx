import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../interfaces/reducers";
import { createBlog } from "../reducers/blogs";
import { setNotification, setAxiosErrorMessage } from "../reducers/notification";

const BlogForm = () => {
  const [title, setTitle] = useState<string>("");
  const [url, setURL] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [likes, setLikes] = useState<number>(0);

  const dispatch = useDispatch<AppThunkDispatch>();

  const addBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const blogObject = { title, url, author, likes };

    try {
      void dispatch(createBlog(blogObject));
      dispatch(setNotification({
        type: "ok",
        message: `A new blog ${title} by ${author} added`,
      }));

      setTitle("");
      setAuthor("");
      setURL("");
      setLikes(0);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setAxiosErrorMessage(error));
      } else {
        console.log(error);
      }
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    if (field === "title") setTitle(e.target.value);
    if (field === "url") setURL(e.target.value);
    if (field === "author") setAuthor(e.target.value);
    if (field === "likes") setLikes(parseInt(e.target.value));
  };

  return (
    <form
      id="form-addBlog"
      onSubmit={(e) => {
        void addBlog(e);
      }}
    >
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => handleFieldChange(e, "title")}
        />
      </div>
      <div className="form-field">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={(e) => handleFieldChange(e, "author")}
        />
      </div>
      <div className="form-field">
        <label htmlFor="url">Url</label>
        <input
          type="text"
          id="url"
          name="url"
          value={url}
          onChange={(e) => handleFieldChange(e, "url")}
        />
      </div>
      <div className="form-field">
        <label htmlFor="likes">Likes</label>
        <input
          type="number"
          id="likes"
          name="likes"
          value={likes}
          onChange={(e) => handleFieldChange(e, "likes")}
        />
      </div>
      <button className="btn-add" type="submit">
        Add blog
      </button>
    </form>
  );
};

export default BlogForm;
