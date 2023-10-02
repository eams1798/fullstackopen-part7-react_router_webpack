import { IUser } from "./user";

export interface loginCredentials {
  username: string;
  password: string;
}

export interface signUpCredentials {
  name: string;
  username: string;
  password: string;
}

export interface loginResponse extends IUser {
  token: string;
}

export interface ErrorResponse {
  error: string;
}
