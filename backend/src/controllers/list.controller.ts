import { type Request, type Response } from "express";
import {
  enterQueue,
  exitQueue,
  enterList,
  exitList,
  getList,
  getQueue,
} from "../services/list.service.js";

export const enterQueueHandler = async (req: Request, res: Response) => {
  try{
    await enterQueue(Number(req.params.id));
    res.status(200).send("Successfully entered queue"); 
  } catch (err) {
    res.status(400).send(err);  
  }
};

export const exitQueueHandler = async (req: Request, res: Response) => {
  try{
    await exitQueue(Number(req.params.id));
    res.status(200).send("Successfully exited queue");
  } catch (err) {
    res.status(400).send(err);  
  }
};

export const enterListHandler = async (req: Request, res: Response) => {
  try{ 
    await enterList(Number(req.params.id)); 
    res.status(200).send("Successfully entered list");
  } catch (err) {
    res.status(400).send(err);  
  } 
};  
export const exitListHandler = async (req: Request, res: Response) => {
  try{
    await exitList(Number(req.params.id));
    res.status(200).send("Successfully exited list");
  } catch (err) {
    res.status(400).send(err);  
  } 
};

export const getListHandler = async (req: Request, res: Response) => {
  try {
    const list = await getList();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getQueueHandler = async (req: Request, res: Response) => {
  try {
    const queue = await getQueue();
    res.status(200).json(queue);
  } catch (err) {
    res.status(500).send(err);
  }
};