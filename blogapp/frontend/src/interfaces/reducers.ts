import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { IBlog } from "./blog";
import { INotification } from "./notification";
import { loginResponse } from "./login";

export interface AppState {
  blogs: IBlog[];
  notification: INotification;
  loginUser: loginResponse | null;
}

export type AppThunkDispatch = ThunkDispatch<AppState, unknown, AnyAction>;