import { LeumiCheckingItem } from "../../types/statements/LeumiCheckingItem";
import { Statement } from "../../types/statements/Statement";
import { StatementType } from "../../types/statements/StatementType";
import { removeCommaAndParseFloat } from "../../utils";
import { TableRow } from "../../utils/TableRow";
import { FileReaderService } from "../FileReaderService";
import { RawStatementFile } from "../RawStatementFile";
import { StatementProcessor } from "../StatementProcessor";
import { LeumiStatementParser } from "./LeumiParsingHelpers";

export class LeumiAccountProcessor
  implements StatementProcessor<LeumiCheckingItem>
{
  accountNumber: string = "";
  async process(file: RawStatementFile, reader: FileReaderService) {
    if (!file.file) {
      throw new Error("No file for Leumi account statement");
    }
    const content = await reader.readAsText(file.file);
    if (typeof content !== "string" || !content.trim()) {
      throw new Error("Invalid content for Leumi account statement");
    }

    const parser = new LeumiStatementParser(content);
    this.accountNumber = parser.extractAccountNumber();
    const transactions = parser.parseCheckingAccountTransactions();

    const items = transactions.map((transaction) =>
      this.convertToLeumiCheckingItem(transaction)
    );

    return new Statement(
      crypto.randomUUID(),
      StatementType.LeumiAccountActivity,
      new Date(),
      items
    );
  }

  private convertToLeumiCheckingItem(row: TableRow): LeumiCheckingItem {
    return new LeumiCheckingItem(
      row.תאריך_ערך,
      row.תיאור,
      removeCommaAndParseFloat(row.בחובה),
      removeCommaAndParseFloat(row.בזכות),
      row.היתרה_בשח,
      row.הערה,
      row.תאריך,
      this.accountNumber
    );
  }
}
