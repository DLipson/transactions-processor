import { MaxCardItem } from "../../types/statements/MaxCardItem";
import { StatementProcessor } from "../StatementProcessor";
import { Statement } from "../../types/statements/Statement";
import { StatementType } from "../../types/statements/StatementType";
import { MaxCardSheetParser } from "./MaxCardSheetParser";
import { MaxCardItemFactory } from "./MaxCardItemFactory";
import { RawStatementFile } from "../RawStatementFile";
import { FileReaderService } from "../fileReaderService";

export class MaxCardsProcessor implements StatementProcessor<MaxCardItem> {
  private readonly sheetParser: MaxCardSheetParser;
  private readonly itemFactory: MaxCardItemFactory;
  private items: MaxCardItem[];
  private date: Date | null;

  constructor() {
    this.sheetParser = new MaxCardSheetParser();
    this.itemFactory = new MaxCardItemFactory();
    this.items = [];
    this.date = null;
  }
  async process(file: RawStatementFile, reader: FileReaderService) {
    if (!file.file) {
      throw new Error("No file for Max cards statement");
    }
    const content = reader.readAsArrayBuffer(file.file!);
    if (!(content instanceof ArrayBuffer) || !content.byteLength) {
      throw new Error("Invalid content for Max cards statement");
    }

    const parsedData = this.sheetParser.parseContent(content);
    this.items = this.itemFactory.createItems(parsedData);
    this.date = this.getDate();
    return this.createStatement();
  }

  private getDate(): Date {
    // TODO: Implement proper date parsing
    return new Date();
  }

  private createStatement(): Statement<MaxCardItem> {
    return new Statement(crypto.randomUUID(), StatementType.MaxCardsTransactions, this.date!, this.items);
  }
}
