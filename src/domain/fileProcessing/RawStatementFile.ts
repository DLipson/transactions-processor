import { StatementType } from "../types/statements/StatementType";

export interface RawStatementFile {
  id: string;
  statementType: StatementType;
  file: File | null;
}
