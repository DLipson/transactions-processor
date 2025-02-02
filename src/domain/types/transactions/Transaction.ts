import { TransactionInstallments } from "./TransactionInstallments";
import { TransactionStatuses } from "./TransactionStatuses";

export interface Transaction {
  id?: number | string;
  /**
   * sometimes called Asmachta
   */
  identifier?: string | number;
  /**
   * ISO date string
   */
  transactionDate: string;
  /**
   * ISO date string
   */
  chargeDate: string;
  originalAmount?: number;
  amount: number;
  description: string;
  memo?: string;
  status?: TransactionStatuses;
  installments?: TransactionInstallments;
  category?: string;
  source?: string;
}
