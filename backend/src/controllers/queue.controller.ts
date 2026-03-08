import { type Request, type Response } from "express";
import {
  enterQueue,
  exitQueue,
  getQueue,
} from "../services/queue.service.js";

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





export const getQueueHandler = async (req: Request, res: Response) => {
  try {
    const queue = await getQueue();
    res.status(200).json(queue);
  } catch (err) {
    res.status(500).send(err);
  }
};