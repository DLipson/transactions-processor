import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { format } from "date-fns";
import { StatementType } from "../../../../domain/types/statements/StatementType";
import { LeumiCardItem } from "../../../../domain/types/statements/LeumiCardItem";
import { LeumiCheckingItem } from "../../../../domain/types/statements/LeumiCheckingItem";
import { MaxCardItem } from "../../../../domain/types/statements/MaxCardItem";

type ColumnConfigs = {
  [StatementType.LeumiCardsTransactions]: { [K in keyof LeumiCardItem]?: Partial<GridColDef> };
  [StatementType.LeumiAccountActivity]: { [K in keyof LeumiCheckingItem]?: Partial<GridColDef> };
  [StatementType.MaxCardsTransactions]: { [K in keyof MaxCardItem]?: Partial<GridColDef> };
};

export const columnConfigs: ColumnConfigs = {
  [StatementType.LeumiCardsTransactions]: {
    תאריך_העסקה: {
      width: 120,
      headerName: "Transaction Date",
      valueFormatter: ({ value }: GridRenderCellParams) => format(new Date(value as string), "PP"),
    },
    שם_בית_העסק: { width: 200, headerName: "Business Name" },
    סכום_העסקה: {
      width: 120,
      headerName: "Amount",
      type: "number",
      valueFormatter: ({ value }: GridRenderCellParams) => `₪${(value as number).toFixed(2)}`,
    },
    מטבע_העסקה: { width: 100, headerName: "Currency" },
    סכום_החיוב: {
      width: 120,
      headerName: "Charge Amount",
      type: "number",
      valueFormatter: ({ value }: GridRenderCellParams) => `₪${(value as number).toFixed(2)}`,
    },
    תאריך_החיוב: {
      width: 120,
      headerName: "Charge Date",
      valueFormatter: ({ value }: GridRenderCellParams) => format(new Date(value as string), "PP"),
    },
    מספר_הכרטיס: { width: 150, headerName: "Card Number" },
  },
  [StatementType.LeumiAccountActivity]: {
    תאריך_ערך: {
      width: 120,
      headerName: "Value Date",
      valueFormatter: ({ value }: GridRenderCellParams) => format(new Date(value as string), "PP"),
    },
    תיאור: { width: 200, headerName: "Description" },
    בחובה: {
      width: 120,
      headerName: "Debit",
      type: "number",
      valueFormatter: ({ value }: GridRenderCellParams) => (value ? `₪${(value as number).toFixed(2)}` : ""),
    },
    בזכות: {
      width: 120,
      headerName: "Credit",
      type: "number",
      valueFormatter: ({ value }: GridRenderCellParams) => (value ? `₪${(value as number).toFixed(2)}` : ""),
    },
    היתרה_בשח: { width: 120, headerName: "Balance" },
    הערה: { width: 150, headerName: "Note" },
    תאריך: {
      width: 120,
      headerName: "Date",
      valueFormatter: ({ value }: GridRenderCellParams) => format(new Date(value as string), "PP"),
    },
    מספר_חשבון: { width: 150, headerName: "Account Number" },
  },
  [StatementType.MaxCardsTransactions]: {
    תאריך_עסקה: {
      width: 120,
      headerName: "Transaction Date",
      valueFormatter: ({ value }: GridRenderCellParams) => format(new Date(value as string), "PP"),
    },
    שם_בית_העסק: { width: 200, headerName: "Business Name" },
    קטגוריה: { width: 120, headerName: "Category" },
    סכום_חיוב: {
      width: 120,
      headerName: "Amount",
      type: "number",
      valueFormatter: ({ value }: GridRenderCellParams) => `₪${(value as number).toFixed(2)}`,
    },
    מטבע_חיוב_העסקה: { width: 100, headerName: "Currency" },
    תאריך_חיוב: {
      width: 120,
      headerName: "Charge Date",
      valueFormatter: ({ value }: GridRenderCellParams) => format(new Date(value as string), "PP"),
    },
    ספרות_אחרונות_של_כרטיס_האשראי: { width: 150, headerName: "Card Number" },
  },
};
