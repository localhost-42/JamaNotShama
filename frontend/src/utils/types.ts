export interface LogRow {
  name: string;
  enter_time: string;
  exit_time: string;
  date: Date | string;
}

export type nameRow = {
  name: string;
  enterTime: Date;
};


export type ScoreRow = {
  name: string;
  score: number;
};