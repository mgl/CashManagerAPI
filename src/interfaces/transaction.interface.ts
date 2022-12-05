import { BankAccount } from "./bank_account.interface.ts";

export interface Transaction {
  date: Date;
  amount: number;
  fromAccountNumber: BankAccount;
  toAccountNumber: BankAccount;
}
