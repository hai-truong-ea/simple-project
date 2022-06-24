import { Blacklist } from "database/models/blacklist";
import { Student } from "database/models/student";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

async function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const isInBlackList = await Blacklist.findOne({ where: { token } });

  if (!token || isInBlackList) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    async (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      const student = await Student.findOne({
        where: {
          username: user.username,
        },
      });
      req.user = student;
      req.token = token;
      next();
    }
  );
}


export default auth;