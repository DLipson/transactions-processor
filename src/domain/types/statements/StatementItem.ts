import { Transaction } from "../transactions/Transaction";

export interface StatementItem {
  toTransactionItem(): Transaction;
}
