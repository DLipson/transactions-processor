import { invertNumber } from "../../utils";
import { Transaction } from "../transactions/Transaction";
import { TransactionInstallments } from "../transactions/TransactionInstallments";
import { StatementItem } from "./StatementItem";

export class MaxCardItem implements StatementItem {
  constructor(
    public תאריך_עסקה: string,
    public שם_בית_העסק: string,
    public קטגוריה: string,
    public ספרות_אחרונות_של_כרטיס_האשראי: string,
    public סוג_עסקה: string,
    public סכום_חיוב: number,
    public מטבע_חיוב_העסקה: string,
    public סכום_עסקה_מקורי: number,
    public מטבע_עסקה_מקורי: string,
    public תאריך_חיוב: string,
    public הערות: string,
    public תיוגים: string,
    public מועדון_הנחות: string,
    public מפתח_דיסקונט: string,
    public אופן_ביצוע_העסקה: string,
    public שער_המרה_ממטבע_מקור_התחשבנות_לשח: string
  ) {}

  toTransactionItem(): Transaction {
    return this.שם_בית_העסק
      ? {
          id: crypto.randomUUID(),
          description: this.שם_בית_העסק,
          transactionDate: this.תאריך_עסקה,
          chargeDate: this.תאריך_חיוב,
          originalAmount: invertNumber(this.סכום_עסקה_מקורי),
          amount: invertNumber(this.סכום_חיוב), //סכום_חיוב is really already a number, as far as I can tell the prop can be changed to number
          installments: {} as TransactionInstallments,
          source: this.ספרות_אחרונות_של_כרטיס_האשראי,
        }
      : ({} as Transaction);
  }
}
