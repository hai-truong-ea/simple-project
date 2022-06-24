import { Request, Response } from "express";

import { ClassRoom } from "database/models/classroom";
import { ClassRoomValidation } from "./classroom.validation";

class ClassRoomController {
  static async findAll(req: Request, res: Response) {
    try {
      const classrooms = await ClassRoom.findAll();
      return res.json(classrooms);
    } catch (err) {
      res.sendStatus(500);
    }
  }

  static async create(req: Request, res: Response) {
    // validate
    const { error, value } = ClassRoomValidation.validateCreate(req.body);
    if (error || !value) {
      return res.status(400).json({
        error: error?.message,
      });
    }
    // perform operations
    try {
      const classroom = await ClassRoom.create({
        name: value.name,
      });
      return res.json(classroom);
    } catch (err) {
      if (err instanceof Error && err.name === "SequelizeUniqueConstraintError")
        return res.status(500).json({ error: "Classname should be unique" });
      res.sendStatus(500);
    }
  }
}

export { ClassRoomController };
