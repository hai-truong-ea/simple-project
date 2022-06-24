import Joi from "joi";
import { ClassRoomCreate, ClassRoomCreateValidation } from "./classroom.model";

class ClassRoomValidation {
  static validateCreate(bodyValue: ClassRoomCreate): ClassRoomCreateValidation {
    const schema = Joi.object<ClassRoomCreate>({
      name: Joi.string().required(),
    });
    return schema.validate(bodyValue, { abortEarly: false });
  }
}

export { ClassRoomValidation };
