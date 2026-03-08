import { type Request, type Response } from "express";
import {
  loginDB,
} from "../services/login.service.js";


import type {  UserRow } from "../util/types.js";

export const login = async (req: Request, res: Response) => {
  const {
    body: { id, name },
  }: Request = req;

  const user: UserRow = await loginDB(id, name);

   res.status(200).json(user);
};

