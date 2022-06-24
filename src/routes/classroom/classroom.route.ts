import { Router } from "express";
import { ClassRoomController } from "./classroom.controller";

const classroomRouter = Router();

classroomRouter
  .route("/")
  .get(ClassRoomController.findAll)
  .post(ClassRoomController.create)

export { classroomRouter };
