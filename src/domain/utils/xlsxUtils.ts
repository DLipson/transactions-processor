import * as xlsx from "xlsx";

export function extractSheetsFromXlsx(fileContent: ArrayBuffer) {
  try {
    const workbook = xlsx.read(fileContent);
    const sheetNames = workbook.SheetNames;
    const rawData: (string | string[])[][] = sheetNames.map((sheetName) => [
      sheetName,
      ...xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 }),
    ]) as (string | string[])[][];
    return rawData;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to process XLSX file");
  }
}

export function arrayToObjectsWithHeaders(
  rows: string[][],
  headers: string[]
): Record<string, string>[] {
  return rows.map((row) =>
    Object.fromEntries(
      row.map((value, index) => [headers[index] ?? "unknown", value || ""])
    )
  );
}

export function createHeaders(
  sheet: string[][],
  headerRowIndex: number
): string[] {
  return sheet[headerRowIndex].map((header) =>
    header
      .replace(/[^a-zA-Zא-ת_\s]/g, "")
      .trim()
      .replace(/\s/g, "_")
  );
}
