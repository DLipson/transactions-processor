import { Statement } from "../types/statements/Statement";
import { StatementItem } from "../types/statements/StatementItem";
import { BrowserFileReaderService } from "./browserFileReaderService";
import { FileReaderService } from "./FileReaderService";
import { RawStatementFile } from "./RawStatementFile";
import {
  DefaultStatementProcessorFactory,
  StatementProcessorFactory,
} from "./StatementProcessorFactory";

export async function processStatementFiles(
  files: RawStatementFile[],
  factory: StatementProcessorFactory = new DefaultStatementProcessorFactory(),
  reader: FileReaderService = new BrowserFileReaderService()
): Promise<Statement<StatementItem>[]> {
  const validFiles = filterValidFiles(files);
  const statements = await Promise.all(
    validFiles.map((file) => processFile(file, factory, reader))
  );
  return statements.filter((statement) => statement.statementItems.length > 0);
}

function filterValidFiles(files: RawStatementFile[]): RawStatementFile[] {
  return files.filter(
    (file) => file.file !== null && file.statementType !== null
  );
}

async function processFile(
  file: RawStatementFile,
  factory: StatementProcessorFactory,
  reader: FileReaderService = new BrowserFileReaderService()
): Promise<Statement<StatementItem>> {
  const processor = factory.createProcessor(file.statementType!);
  const items = await processor.process(file, reader);
  return new Statement(
    crypto.randomUUID(),
    file.statementType!,
    new Date(),
    items.statementItems
  );
}
