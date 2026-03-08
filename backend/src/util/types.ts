// import { excelDB } from "../services/other.service.js";

export interface LogRow {
 name: string;
  exit_time: string;
  return_time: string;
  date: Date | string;
}

// export interface ExcelReportRow {
//   name: string;
//   exit_time: Date | string;
//   return_time: Date | string;
//   date: Date | string;
// }

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
