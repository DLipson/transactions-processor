import { invertNumber } from "../../utils";
import { Transaction } from "../transactions/Transaction";
import { TransactionInstallments } from "../transactions/TransactionInstallments";
import { StatementItem } from "./StatementItem";

export class LeumiCheckingItem implements StatementItem {
  constructor(
    public תאריך_ערך: string,
    public תיאור: string,
    public בחובה: number,
    public בזכות: number,
    public היתרה_בשח: string,
    public הערה: string,
    public תאריך: string,
    public מספר_חשבון: string
  ) {}

  toTransactionItem(): Transaction {
    return {
      id: crypto.randomUUID(),
      description: this.תיאור,
      amount: getAmount(this),
      chargeDate: this.תאריך,
      transactionDate: this.תאריך_ערך,
      installments: {} as TransactionInstallments,
      source: `leumi checking: ${this.מספר_חשבון.trim()}`,
    };
    function getAmount(item: LeumiCheckingItem): number {
      const income = item.בזכות;
      const expense = item.בחובה;
      return income > 0 ? income : invertNumber(expense);
    }
  }
}
