import { type Request, type Response } from "express";
import {
  loginDB,
  logsDB,
  getListDB,
  getQueueDB,
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

export const getList = async (req: Request, res: Response) => {
  const list = await getListDB();

  return res.status(200).json(list);
};

export const getQueue = async (req: Request, res: Response) => {
  const queue = await getQueueDB();

  return res.status(200).json(queue);
};
