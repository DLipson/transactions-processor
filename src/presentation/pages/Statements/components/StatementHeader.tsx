import { Box, Typography, Paper } from "@mui/material";
import { format } from "date-fns";
import { StatementHeaderProps } from "../types";

export function StatementHeader({ statement }: StatementHeaderProps) {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6" component="h2">
            Statement Details
          </Typography>
          <Typography color="text.secondary">Type: {statement.statementType}</Typography>
          <Typography color="text.secondary">Date: {format(statement.statementDate, "PPP")}</Typography>
        </Box>
        <Typography color="text.secondary">ID: {statement.id}</Typography>
      </Box>
    </Paper>
  );
}
