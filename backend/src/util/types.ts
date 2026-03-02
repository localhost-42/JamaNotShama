export interface LogRow {
  id: number;
  userId: number;
  name: string;
  enterTime: Date;
  exitTime: Date;
}

export type UserRow = {
  user_id: number;
  name: string;
};
