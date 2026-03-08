import { type Request, type Response } from "express";
import {

  enterList,
  exitList,
  getList,
  getLogs,
} from "../services/list.service.js";
import type { LogRow } from "../util/types.js";



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


export const logs = async (req: Request, res: Response) => {
  try{
    const logs: LogRow[] = await getLogs();

     return res.status(200).json(logs);
  } catch (err: unknown) {

    if(err instanceof Error){

      return res.status(500).json({ message: `error ${err.message} cause: ${err.cause}`});
    }

    return res.status(500).send("idek");
  }
};

