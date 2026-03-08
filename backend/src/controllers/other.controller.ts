import { type Request, type Response } from "express";
import {
  loginDB,
  logsDB,
} from "../services/other.service.js";
import ExcelJS from "exceljs";

import type {  LogRow, UserRow } from "../util/types.js";

export const login = async (req: Request, res: Response) => {
  const {
    body: { id, name },
  }: Request = req;

  const user: UserRow = await loginDB(id, name);

  return res.status(200).json(user);
};

export const logs = async (req: Request, res: Response) => {
  try{
    const logs: LogRow[] = await logsDB();

     return res.status(200).json(logs);
  } catch (err: unknown) {

    if(err instanceof Error){

      return res.status(500).json({ message: `error ${err.message} cause: ${err.cause}`});
    }

    return res.status(500).send("idek");
  }
};

// export const excelHandler = async (req: Request, res: Response) => {
//   try{

//     const excelReportRow: ExcelReportRow[] = await excelDB();
    
//    res.status(200).json(excelReportRow);
    
 
//   } catch (err: unknown) {

//     if(err instanceof Error){

//       return res.status(500).json({ message: `error ${err.message} cause: ${err.cause}`});
//     }

//     return res.status(500).send("idek");
//   }
// };