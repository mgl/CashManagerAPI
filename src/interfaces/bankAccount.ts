import { Bson } from "../../deps.ts";

export interface BankAccount {
  _id?: Bson.ObjectId;
  num_account: string;
  firstname?: string;
  lastname?: string;
  balance: number;
}