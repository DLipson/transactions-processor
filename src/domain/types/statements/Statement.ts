import { StatementItem } from "./StatementItem";
import { StatementType } from "./StatementType";

export class Statement<T extends StatementItem> {
  constructor(
    public id: string,
    public statementType: StatementType,
    public statementDate: Date,
    public statementItems: T[]
  ) {}
}
