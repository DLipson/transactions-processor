import React, { createContext, useState } from "react";
import { Statement } from "../../domain/types/statements/Statement";
import { StatementItem } from "../../domain/types/statements/StatementItem";
import { Transaction } from "../../domain/types/transactions/Transaction";

interface StatementContextState {
  statements: { [id: string]: Statement<StatementItem> };
  transactions: { [id: string]: Transaction };
  statementToTransactions: { [statementId: string]: number[] };
  transactionToStatement: { [transactionId: string]: string };
}

interface StatementContextActions {
  addStatement: (statement: Statement<StatementItem>) => void;
  addTransactions: (statementId: string, transactions: Transaction[]) => void;
  clearTransactions: () => void;
}

interface StatementContextValue
  extends StatementContextState,
    StatementContextActions {}

export const StatementContext = createContext<StatementContextValue | null>(
  null
);

export function StatementProvider({ children }: { children: React.ReactNode }) {
  const [statementContextState, setStatementContextState] =
    useState<StatementContextState>({
      statements: {},
      transactions: {},
      statementToTransactions: {},
      transactionToStatement: {},
    });

  const addStatement = (statement: Statement<StatementItem>) => {
    setStatementContextState((prev) => ({
      ...prev,
      statements: { ...prev.statements, [statement.id]: statement },
    }));
  };

  const addTransactions = (
    statementId: string,
    transactions: Transaction[]
  ) => {
    setStatementContextState((prev) => {
      const newTransactions = { ...prev.transactions };
      const newTransactionToStatement = { ...prev.transactionToStatement };
      const newStatementToTransactions = { ...prev.statementToTransactions };

      transactions.forEach((transaction) => {
        newTransactions[transaction.id as number] = transaction;
        newTransactionToStatement[transaction.id as number] = statementId;

        if (!newStatementToTransactions[statementId]) {
          newStatementToTransactions[statementId] = [];
        }
        newStatementToTransactions[statementId].push(transaction.id as number);
      });

      return {
        ...prev,
        transactions: newTransactions,
        transactionToStatement: newTransactionToStatement,
        statementToTransactions: newStatementToTransactions,
      };
    });
  };

  const clearTransactions = () => {
    setStatementContextState((prev) => ({
      ...prev,
      transactions: {},
      statementToTransactions: {},
      transactionToStatement: {},
    }));
  };

  const value: StatementContextValue = {
    ...statementContextState,
    addStatement,
    addTransactions,
    clearTransactions,
  };

  return (
    <StatementContext.Provider value={value}>
      {children}
    </StatementContext.Provider>
  );
}
