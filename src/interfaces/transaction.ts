import { Bson } from "../../deps.ts";

export interface Transaction {
  _id: Bson.ObjectId;
  date: Date;
  description: string;
  amount: number;
  from: Bson.ObjectId;
  to: Bson.ObjectId;
}
