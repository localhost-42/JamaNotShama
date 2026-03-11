export interface LogRow {
  name: string;
  enter_time: string;
  exit_time: string;
  date: Date | string;
}

export type nameRow = {
  name: string;
};

export type nameTimeRow = {
  name: string;
  enterTime: string;
};

export type ScoreRow = {
  name: string;
  score: number;
};
