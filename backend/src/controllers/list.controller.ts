import { type Request, type Response } from "express";
import {
  enterQueueDB,
  exitQueueDB,
  enterListDB,
  exitListDB,
  getList,
  getQueue,
} from "../services/list.service.js";

export const enterQueue = async (req: Request, res: Response) => {};

export const exitQueue = async (req: Request, res: Response) => {};

export const enterList = async (req: Request, res: Response) => {};

export const exitList = async (req: Request, res: Response) => {};

export const getList = async (req: Request, res: Response) => {};

export const getQueue = async (req: Request, res: Response) => {};
