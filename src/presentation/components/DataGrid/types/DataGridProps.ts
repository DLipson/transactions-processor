import { GridColDef } from "@mui/x-data-grid";

export interface DataGridProps<T> {
  data: T[];
  hiddenColumns?: (keyof T)[];
  excludeFields?: (keyof T)[];
  customColumnConfigs?: Partial<Record<keyof T, Partial<GridColDef>>>;
  additionalColumns?: GridColDef[];
}
