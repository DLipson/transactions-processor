import { GridColDef, GridRowParams, GridValidRowModel } from "@mui/x-data-grid";

export interface DataGridProps<T extends GridValidRowModel> {
  data: T[];
  hiddenColumns?: (keyof T)[];
  excludeFields?: (keyof T)[];
  customColumnConfigs?: Partial<Record<keyof T, Partial<GridColDef>>>;
  additionalColumns?: GridColDef[];
  onRowClick?: (params: GridRowParams<T>) => void;
}
