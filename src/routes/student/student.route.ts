import { Router } from "express";

import auth from "middlewares/authMiddleware";
import { StudentController } from "./student.controller";

const studentRouter = Router();

studentRouter
  .route("/")
  .post(StudentController.create)

studentRouter
  .route("/login")
  .post(StudentController.login);

studentRouter
  .route("/logout")
  .get(auth, StudentController.logout)

studentRouter
  .route("/protected")
  .get(auth, StudentController.protectedRouteController);

export { studentRouter };
