import { Box, CircularProgress, Alert } from "@mui/material";
import { DataGrid, ErrorBoundary } from "../../../components";
import { StatementDetailProps } from "../types";
import { StatementHeader } from "./StatementHeader";
import { columnConfigs } from "../utils/columnConfigs";

export function StatementDetail({ statement }: StatementDetailProps) {
  if (!statement) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  const config = columnConfigs[statement.statementType];
  if (!config) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Unsupported statement type: {statement.statementType}
      </Alert>
    );
  }

  const columnNames = Object.keys(config);

  return (
    <ErrorBoundary>
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <StatementHeader statement={statement} />
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            data={statement.statementItems}
            customColumnConfigs={config}
            excludeFields={
              Object.keys(statement.statementItems[0] || {}).filter(
                (key) => !columnNames.includes(key)
              ) as (keyof (typeof statement.statementItems)[0])[]
            }
          />
        </Box>
      </Box>
    </ErrorBoundary>
  );
}
