import { BankAccount } from "./bankAccount.ts";

export interface Transaction {
  date: Date;
  amount: number;
  fromAccountNumber: BankAccount;
  toAccountNumber: BankAccount;
}
