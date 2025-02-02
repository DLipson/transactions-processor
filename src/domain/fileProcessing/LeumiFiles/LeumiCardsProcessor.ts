import { LeumiCardItem } from "../../types/statements/LeumiCardItem";
import { Statement } from "../../types/statements/Statement";
import { StatementType } from "../../types/statements/StatementType";
import { removeCommaAndParseFloat } from "../../utils";
import { TableRow } from "../../utils/TableRow";
import { FileReaderService } from "../fileReaderService";
import { RawStatementFile } from "../RawStatementFile";
import { StatementProcessor } from "../StatementProcessor";
import { LeumiStatementParser } from "./LeumiParsingHelpers";

export class LeumiCardsProcessor implements StatementProcessor<LeumiCardItem> {
  async process(file: RawStatementFile, reader: FileReaderService) {
    if (!file.file) {
      throw new Error("No file for Leumi cards statement");
    }
    const content = await reader.readAsText(file.file);
    if (typeof content !== "string" || !content.trim()) {
      throw new Error("Invalid content for Leumi cards statement");
    }

    const parser = new LeumiStatementParser(content);
    const transactions = parser.parseCreditCardTransactions();
    const items = transactions.map((transaction) => this.convertToLeumiCardItem(transaction));

    return new Statement(crypto.randomUUID(), StatementType.LeumiCardsTransactions, new Date(), items);
  }

  private convertToLeumiCardItem(row: TableRow): LeumiCardItem {
    return new LeumiCardItem(
      row.תאריך_העסקה,
      row.שם_בית_העסק,
      removeCommaAndParseFloat(row.סכום_העסקה),
      row.מטבע_העסקה,
      removeCommaAndParseFloat(row.סכום_החיוב),
      row.מטבע_חיוב_העסקה,
      row.סוג_העסקה,
      row.פרטים,
      row.תאריך_החיוב,
      row.מספר_הכרטיס
    );
  }
}
