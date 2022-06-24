import { ValidationError } from "joi";

export interface ClassRoomCreate {
  name: string;
}

export interface ClassRoomCreateValidation {
  value?: ClassRoomCreate;
  error?: ValidationError;
}
