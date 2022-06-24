import Joi from "joi";
import {
  StudentCreate,
  StudentCreateValidation,
  StudentLogin,
  StudentLoginValidation,
} from "./student.model";

class StudentValidation {
  static validateCreate(bodyValue: StudentCreate): StudentCreateValidation {
    const schema = Joi.object<StudentCreate>({
      username: Joi.string().required(),
      password: Joi.string().required(),
      className: Joi.string().required(),
      info: Joi.string(),
    });
    return schema.validate(bodyValue, { abortEarly: false });
  }

  static validateLogin(bodyValue: StudentLogin): StudentLoginValidation {
    const schema = Joi.object<StudentLogin>({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    return schema.validate(bodyValue, { abortEarly: false });
  }
}

export { StudentValidation };
