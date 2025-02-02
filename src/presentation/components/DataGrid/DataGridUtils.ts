import { GridColDef } from "@mui/x-data-grid";

export function generateColumns<T>(
  data: T[],
  excludeFields: (keyof T)[] = [],
  customColumnConfigs: Partial<Record<keyof T, Partial<GridColDef>>> = {},
  additionalColumns: GridColDef[] = []
): GridColDef[] {
  if (data.length === 0) return [];

  const sampleItem = data[0];
  const columns: GridColDef[] = [];

  for (const key in sampleItem) {
    if (excludeFields.includes(key as keyof T)) continue;

    const column: GridColDef = {
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      ...customColumnConfigs[key as keyof T],
    };

    columns.push(column);
  }

  return [...columns, ...additionalColumns];
}
