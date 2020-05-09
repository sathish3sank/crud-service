import express, { Response } from "express";
import { createConnection } from "typeorm";
import { User } from "../entity/User";

export const router = express.Router();

router.get("/list", (req, res: Response, err) => {
  return createConnection()
    .then(async (connection) => {
      const users = await connection.manager.find(User);
      connection.close();
      return res.json({ users: users });
    })
    .catch((err) => {
      res.statusCode = 400;
      res.statusMessage = "No data bases found";
      return res.send();
    });
});
