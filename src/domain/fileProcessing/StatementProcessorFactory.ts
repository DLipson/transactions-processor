import { StatementItem } from "../types/statements/StatementItem";
import { StatementType } from "../types/statements/StatementType";
import { LeumiAccountProcessor } from "./LeumiFiles/LeumiAccountProcessor";
import { LeumiCardsProcessor } from "./LeumiFiles/LeumiCardsProcessor";
import { MaxCardsProcessor } from "./MaxCardProcessing/MaxCardsProcessor";
import { StatementProcessor } from "./StatementProcessor";

export interface StatementProcessorFactory {
  createProcessor(type: StatementType): StatementProcessor<StatementItem>;
}

export class DefaultStatementProcessorFactory
  implements StatementProcessorFactory
{
  private readonly processorMap = {
    [StatementType.LeumiAccountActivity]: LeumiAccountProcessor,
    [StatementType.LeumiCardsTransactions]: LeumiCardsProcessor,
    [StatementType.MaxCardsTransactions]: MaxCardsProcessor,
  };

  createProcessor(type: StatementType): StatementProcessor<StatementItem> {
    const ProcessorClass = this.processorMap[type];
    if (!ProcessorClass) {
      throw new Error(`No processor found for statement type: ${type}`);
    }
    return new ProcessorClass();
  }
}
