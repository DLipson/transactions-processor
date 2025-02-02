import { MouseEventHandler } from "react";
import { Transaction } from "../../../domain/types/transactions/Transaction";
import { DataGrid } from "../../components/DataGrid/DataGrid";
import { Button } from "@mui/material";

const ClearTransactionsButton = ({
  onClearTransactions,
}: {
  onClearTransactions: MouseEventHandler<HTMLButtonElement> | undefined;
}) => (
  <Button
    onClick={onClearTransactions}
    variant="contained"
    color="error"
    sx={{
      mt: 2,
    }}
  >
    Clear All Transactions
  </Button>
);

const TransactionGrid = ({
  transactions = [],
  onClearTransactions,
}: {
  transactions: Transaction[];
  onClearTransactions: () => void;
}) => {
  const hiddenColumns: (keyof Transaction)[] = [
    "id",
    "transactionDate",
    "originalAmount",
    "installments",
  ];
  return (
    <div>
      <DataGrid data={transactions} hiddenColumns={hiddenColumns} />
      <ClearTransactionsButton
        onClearTransactions={onClearTransactions}
      ></ClearTransactionsButton>{" "}
    </div>
  );
};

export default TransactionGrid;
