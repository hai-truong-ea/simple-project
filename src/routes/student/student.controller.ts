import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { Blacklist } from "database/models/blacklist";
import { ClassRoom } from "database/models/classroom";
import { generateAccessToken } from "utils/authUtil";
import { StudentValidation } from "./student.validation";
import { Student } from "database/models/student";

class StudentController {
  static async create(req: Request, res: Response) {
    // validate
    const { error, value } = StudentValidation.validateCreate(req.body);
    if (error || !value) {
      return res.status(400).json({
        error: error?.message,
      });
    }
    // perform operations
    try {
      const classroom = await ClassRoom.findOne({
        where: {
          name: value.className,
        },
      });
      if (!classroom) {
        return res.status(400).json({
          error: "Please fill in a correct class name",
        });
      }

      const hashedPassword = await bcrypt.hash(value.password, 10);
      const student = await Student.create({
        ...value,
        password: hashedPassword,
        classRoomID: classroom.id,
      });
      const studentVal = student.toJSON();
      delete studentVal.password;
      return res.json(studentVal);
    } catch (err) {
      if (err instanceof Error && err.name === "SequelizeUniqueConstraintError")
        return res.status(500).json({ error: "Username must be unique" });

      return res
        .status(500)
        .json({ error: "Something went wrong while creating a student" });
    }
  }

  static async login(req: Request, res: Response) {
    // validate
    const { error, value } = StudentValidation.validateLogin(req.body);
    if (error || !value) {
      return res.status(400).json({
        error: "Invalid username or Password",
      });
    }
    try {
      // perform operations
      const student = await Student.findOne({
        where: {
          username: value.username,
        },
      });
      if (!student) {
        return res.status(400).json({
          message: "Invalid username or password",
        });
      }

      const isPasswordTheSame = await bcrypt.compare(
        value.password,
        student.password
      );
      if (!isPasswordTheSame) {
        return res.status(400).json({
          message: "Invalid username or password",
        });
      }

      const studentVal = student.toJSON();
      delete studentVal.password;
      // send jwt
      const token = generateAccessToken(student.username);
      
      return res.json({
        token,
        studentVal,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Something went wrong while logging in" });
    }
  }

  static async protectedRouteController(req: Request, res: Response) {
    return res.json({ message: "Protected route" });
  }

  static async logout(req: Request, res: Response) {
    await Blacklist.create({
      token: req.token
    });
    return res.json({ message: "Logout successfully" });
  }
}

export { StudentController };
