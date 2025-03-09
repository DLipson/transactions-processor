import { Statement } from "../../../domain/types/statements/Statement";
import { StatementItem } from "../../../domain/types/statements/StatementItem";
import { LeumiCardItem } from "../../../domain/types/statements/LeumiCardItem";
import { LeumiCheckingItem } from "../../../domain/types/statements/LeumiCheckingItem";
import { MaxCardItem } from "../../../domain/types/statements/MaxCardItem";

export interface StatementDetailProps {
  statement: Statement<StatementItem>;
}

export interface StatementHeaderProps {
  statement: Statement<StatementItem>;
}

export type StatementItemType = LeumiCardItem | LeumiCheckingItem | MaxCardItem;

export interface StatementsListProps {
  onSelectStatement: (statement: Statement<StatementItem>) => void;
}
