import { extractSheetsFromXlsx, createHeaders } from "../../utils/xlsxUtils";

export interface ParsedSheetData {
  headers: string[];
  transactions: string[][];
}

export class MaxCardSheetParser {
  parseContent(content: ArrayBuffer): ParsedSheetData[] {
    const sheets = extractSheetsFromXlsx(content) as string[][][];
    return sheets.map((sheet) => this.parseSheet(sheet));
  }

  private parseSheet(sheet: string[][]): ParsedSheetData {
    const headerRowIndex = this.findHeaderRowIndex(sheet);
    const headers = createHeaders(sheet, headerRowIndex);
    const totalsRowIndex = this.findTotalsRowIndex(sheet);
    const transactions = this.extractTransactions(
      sheet,
      headerRowIndex,
      totalsRowIndex
    );

    return { headers, transactions };
  }

  private findHeaderRowIndex(sheet: string[][]): number {
    return sheet.findIndex(
      (row) => Array.isArray(row) && row.some((x) => x === "תאריך עסקה")
    );
  }

  private findTotalsRowIndex(sheet: string[][]): number {
    return sheet.findIndex((row) => row[0] === "סך הכל");
  }

  private extractTransactions(
    sheet: string[][],
    headerRowIndex: number,
    totalsRowIndex: number
  ): string[][] {
    return sheet
      .slice(headerRowIndex + 1, totalsRowIndex)
      .filter((x) => x.length > 0)
      .map((transaction) =>
        transaction.map((value) => (value !== "" ? value : " "))
      );
  }
}
