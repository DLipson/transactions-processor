import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Statement } from "../../../domain/types/statements/Statement";
import { StatementItem } from "../../../domain/types/statements/StatementItem";
import { StatementsList } from "./components/StatementsList";
import { StatementDetail } from "./components/StatementDetail";
import { ErrorBoundary } from "../../components";

export function StatementsPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedStatement, setSelectedStatement] = useState<Statement<StatementItem> | null>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleSelectStatement = (statement: Statement<StatementItem>) => {
    setSelectedStatement(statement);
    setSelectedTab(1);
  };

  return (
    <ErrorBoundary>
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Tabs value={selectedTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tab label="All Statements" />
          <Tab label="Statement Details" disabled={!selectedStatement} />
        </Tabs>
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          {selectedTab === 0 && <StatementsList onSelectStatement={handleSelectStatement} />}
          {selectedTab === 1 && selectedStatement && <StatementDetail statement={selectedStatement} />}
        </Box>
      </Box>
    </ErrorBoundary>
  );
}
