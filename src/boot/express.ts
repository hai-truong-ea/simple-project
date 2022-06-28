import express, { Express, NextFunction, Request, Response } from "express";
import { routers } from "routes";

import "boot/cron";
import database from "database/models";

const app: Express = express();
database.sequelize.sync();

app.use(express.json());
app.use("/", routers);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = { ...new Error("Not found"), status: 404 };
  next(error);
});

interface ErrorWithStatus extends Error {
  status?: number;
}
// handling error
app.use(
  (error: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).json({
      error: error.message,
    });
  }
);

export default app;
