import { excelDB } from "../services/other.service.js";

export interface LogRow {
  id: number;
  userId: number;
  enterTime: Date;
  exitTime: Date;
}

export interface ExcelReportRow {
  name: string;
  exit_time: Date | string;
  return_time: Date | string;
  current_date: Date | string;
}

export type UserRow = {
  userId: number;
  name: string;
};

export type ListRow = {
  userId: number;
  enterTime: Date;
  exitTime: Date;
};

export type QueueRow = {
  userId: number;
  enterTime: Date;
  exitTime: Date;
};
