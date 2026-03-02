import { type Request, type Response } from "express";
import {
  enterQueueDB,
  exitQueueDB,
  enterListDB,
  exitListDB,
  getList,
  getQueue,
} from "../services/list.service.js";

export const enterQueue = async (req: Request, res: Response) => {
  const users = await service.list();
  return res.status(200).json({
    success: true,
    data: users,
  });
};

export const exitQueue = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = await service.getById(id);

  return res.status(200).json({
    success: true,
    data: user,
  });
};

export const enterList = async (req: Request, res: Response) => {
  const { name } = req.body as { name: string };

  const user = await service.create(name);

  return res.status(201).json({
    success: true,
    data: user,
  });
};

export const exitList = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await service.delete(id);

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};

export const getList = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await service.delete(id);

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};

export const getQueue = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await service.delete(id);

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};
