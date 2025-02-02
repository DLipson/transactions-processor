export interface TableRow {
  [key: string]: string;
}

export interface TableParseResult {
  headers: string[];
  rows: TableRow[];
}
