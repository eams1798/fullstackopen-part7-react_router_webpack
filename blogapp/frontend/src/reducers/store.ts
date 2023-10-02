import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogs";
import notificationReducer from "./notification";
import loginUserReducer from "./loginUser";

export const store = configureStore({
  reducer : {
    blogs: blogReducer,
    notification: notificationReducer,
    loginUser: loginUserReducer
  }
});
