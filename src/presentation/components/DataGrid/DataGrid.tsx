import { GridToolbarContainer, GridToolbarExport, DataGrid as MUIDataGrid, GridValidRowModel } from "@mui/x-data-grid";
import { useMemo } from "react";
import { generateColumns } from "./DataGridUtils";
import { DataGridProps } from "./types";

const DataGrid = <T extends GridValidRowModel>({
  data,
  hiddenColumns = [],
  excludeFields = [],
  customColumnConfigs = {},
  additionalColumns = [],
  onRowClick,
}: DataGridProps<T>) => {
  const columns = useMemo(
    () => generateColumns(data, excludeFields, customColumnConfigs, additionalColumns),
    [data, excludeFields, customColumnConfigs, additionalColumns]
  );

  return (
    <MUIDataGrid
      rows={data}
      columns={columns}
      pageSizeOptions={[10, 25, 50, 100]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 25, page: 0 },
        },
        columns: {
          columnVisibilityModel: Object.fromEntries(hiddenColumns.map((columnName) => [columnName, false])),
        },
      }}
      slots={{
        toolbar: CustomToolbar,
      }}
      onRowClick={onRowClick}
    />
  );
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export { DataGrid };
