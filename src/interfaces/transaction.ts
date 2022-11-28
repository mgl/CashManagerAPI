import { Bson } from "../../deps.ts";
import { BankAccount } from "./bankAccount.ts";

export interface Transaction {
  _id?: Bson.ObjectId;
  date: Date;
  amount: number;
  fromAccountNumber: BankAccount;
  toAccountNumber: BankAccount;
}
