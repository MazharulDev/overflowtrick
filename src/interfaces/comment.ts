import { IUser } from "./author";

export interface ICommnets {
  text: string;
  author: IUser;
  _id: string;
  createdAt: number;
}
