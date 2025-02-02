import { Statement } from "../types/statements/Statement";
import { StatementItem } from "../types/statements/StatementItem";
import { FileReaderService } from "./FileReaderService";
import { RawStatementFile } from "./RawStatementFile";

export interface StatementProcessor<T extends StatementItem> {
  process(
    file: RawStatementFile,
    reader: FileReaderService
  ): Promise<Statement<T>>;
}
