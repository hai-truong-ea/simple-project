import { Router } from "express";

import { classroomRouter } from "routes/classroom";
import { studentRouter } from "routes/student";

const routers = Router();
routers.use("/api/classroom", classroomRouter);
routers.use("/api/student", studentRouter);

export { routers };
