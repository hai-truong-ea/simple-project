import { ValidationError } from "joi";

export interface StudentCreate {
  username: string;
  password: string;
  className: string;
  info?: string;
}

export interface StudentCreateValidation {
  value?: StudentCreate;
  error?: ValidationError;
}

export interface StudentLogin {
  username: string;
  password: string;
}

export interface StudentLoginValidation {
  value?: StudentLogin;
  error?: ValidationError;
}
