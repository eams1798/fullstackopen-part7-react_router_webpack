import { PayloadAction, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { IBlog } from "../interfaces/blog";
import blogService from "../services/blogs";
import { AppThunkDispatch } from "../interfaces/reducers";

const blogSlice = createSlice<IBlog[], SliceCaseReducers<IBlog[]>, string>({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (_state_: IBlog[], action: PayloadAction<IBlog[]>) => {
      return action.payload;
    },

    addBlog: (state: IBlog[], action: PayloadAction<IBlog>) => {
      state.push(action.payload);
    },

    likeBlogById: (state: IBlog[], action: PayloadAction<string>) => {
      const blog = state.find((blog) => blog.id === action.payload);
      if (blog) {
        const index = state.indexOf(blog);
        state[index] = { ...blog, likes: blog.likes! + 1 };
      }
    },

    removeBlogById: (state: IBlog[], action: PayloadAction<string>) => {
      return state.filter((blog) => blog.id !== action.payload);
    }
  },
});

export const { setBlogs, addBlog, likeBlogById, removeBlogById } = blogSlice.actions;

export const initializeBlogs = () => async (dispatch: AppThunkDispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog = (blog: IBlog) => async (dispatch: AppThunkDispatch) => {
  const newBlog = await blogService.create(blog);
  dispatch(addBlog(newBlog));
};

export const likeBlog = (blog: IBlog) => async (dispatch: AppThunkDispatch) => {
  const updatedBlog = await blogService.update(blog.id!, {
    likes: blog.likes! + 1,
  });
  dispatch(likeBlogById(updatedBlog.id!));
};

export const removeBlog = (blog: IBlog) => async (dispatch: AppThunkDispatch) => {
  await blogService.remove(blog.id!);
  dispatch(removeBlogById(blog.id!));
};

export default blogSlice.reducer;