export interface LogRow {
  id: number;
  userId: number;
  enterTime: Date;
  exitTime: Date;
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
