import { type Request, type Response } from "express";
import {
  loginDB,
  logsDB,
excelDB,
} from "../services/other.service.js";
import ExcelJS from "exceljs";

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

export const excelHandler = async (req: Request, res: Response) => {
  try{

    const workbook: ExcelJS.Workbook = await excelDB();
    
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=report.xlsx"
    );
    
    await workbook.xlsx.write(res);
    res.end()
  } catch (err: unknown) {

    if(err instanceof Error){

      return res.status(500).json({ message: `error ${err.message} cause: ${err.cause}`});
    }

    return res.status(500).send("idek");
  }
};