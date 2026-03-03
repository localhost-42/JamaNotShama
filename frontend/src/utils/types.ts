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
  date: Date | string;
}