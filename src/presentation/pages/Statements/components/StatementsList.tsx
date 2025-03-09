import { Box, Paper, Typography } from "@mui/material";
import { DataGrid, ErrorBoundary } from "../../../components";
import { useStatements } from "../../../context/useStatements";
import { format } from "date-fns";
import { GridRenderCellParams, GridRowParams } from "@mui/x-data-grid";
import { StatementsListProps } from "../types";
import { Statement } from "../../../../domain/types/statements/Statement";
import { StatementItem } from "../../../../domain/types/statements/StatementItem";

export function StatementsList({ onSelectStatement }: StatementsListProps) {
  const { statements } = useStatements();

  const customColumnConfigs = {
    statementType: { headerName: "Type", width: 200 },
    statementDate: {
      headerName: "Date",
      width: 150,
      valueFormatter: ({ value }: GridRenderCellParams<Statement<StatementItem>, Date>) =>
        value ? format(value, "PPP") : "-",
    },
    id: { headerName: "ID", width: 250 },
    itemCount: {
      headerName: "Items",
      width: 100,
      valueGetter: ({ row }: GridRenderCellParams<Statement<StatementItem>>) => row.statementItems.length,
    },
  };

  const handleRowClick = (params: GridRowParams<Statement<StatementItem>>) => {
    onSelectStatement(params.row);
  };

  return (
    <ErrorBoundary>
      <Paper sx={{ height: "100%", p: 2 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Statements
        </Typography>
        <Box sx={{ height: "calc(100% - 60px)" }}>
          <DataGrid
            data={Object.values(statements)}
            customColumnConfigs={customColumnConfigs}
            excludeFields={["statementItems"]}
            onRowClick={handleRowClick}
          />
        </Box>
      </Paper>
    </ErrorBoundary>
  );
}
