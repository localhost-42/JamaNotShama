

export interface LogRow {
 name: string;
 enter_time: string;
  exit_time: string;
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
  name: UserRow['name'];
};


export type QueueRow = {
  userId: number;
  enterTime: Date;
  exitTime: Date;
};
