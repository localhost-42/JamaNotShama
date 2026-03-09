export interface LogRow {
  name: UserRow["name"];
  enter_time: ListRow["enterTime"];
  exit_time: ListRow["exitTime"];
  date: Date | string;
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

export type nameRow = {
  name: UserRow["name"];
  enterTime: Date;
};

export type QueueRow = {
  userId: number;
  enterTime: Date;
  exitTime: Date;
};
