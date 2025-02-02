import { useContext } from "react";
import { StatementContext } from "./StatementProvider";

export function useStatements() {
  const context = useContext(StatementContext);
  if (!context) {
    throw new Error("useStatement must be used within a StatementProvider");
  }
  return context;
}
