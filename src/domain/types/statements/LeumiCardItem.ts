import { invertNumber } from "../../utils";
import { Transaction } from "../transactions/Transaction";
import { TransactionInstallments } from "../transactions/TransactionInstallments";
import { StatementItem } from "./StatementItem";

export class LeumiCardItem implements StatementItem {
  constructor(
    public תאריך_העסקה: string,
    public שם_בית_העסק: string,
    public סכום_העסקה: number,
    public מטבע_העסקה: string,
    public סכום_החיוב: number,
    public מטבע_חיוב_העסקה: string,
    public סוג_העסקה: string,
    public פרטים: string,
    public תאריך_החיוב: string,
    public מספר_הכרטיס: string
  ) {}
  toTransactionItem(): Transaction {
    return {
      id: crypto.randomUUID(),
      description: this.שם_בית_העסק,
      transactionDate: this.תאריך_העסקה,
      chargeDate: this.תאריך_החיוב,
      originalAmount: invertNumber(this.סכום_העסקה),
      amount: invertNumber(this.סכום_החיוב),
      installments: {} as TransactionInstallments,
      source: this.מספר_הכרטיס,
    };
  }
}
