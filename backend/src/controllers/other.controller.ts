import { type Request, type Response } from "express";
import {
  loginDB,
  logsDB,

} from "../services/other.service.js";
import type { LogRow, UserRow } from "../util/types.js";

export const login = async (req: Request, res: Response) => {
  const {
    body: { id, name },
  }: Request = req;

  const user: UserRow = await loginDB(id, name);

  return res.status(200).json(user);
};

export const logs = async (req: Request, res: Response) => {
  const logs = await logsDB();

  return res.status(200).json(logs);
};
