import {
  GridToolbarContainer,
  GridToolbarExport,
  DataGrid as MUIDataGrid,
} from "@mui/x-data-grid";
import { useMemo } from "react";
import { generateColumns } from "./DataGridUtils";
import { DataGridProps } from "./types";
const DataGrid = <T,>({
  data,
  hiddenColumns = [],
  excludeFields = [],
  customColumnConfigs = {},
  additionalColumns = [],
}: DataGridProps<T>) => {
  const columns = useMemo(
    () =>
      generateColumns(
        data,
        excludeFields,
        customColumnConfigs,
        additionalColumns
      ),
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
          columnVisibilityModel: Object.fromEntries(
            hiddenColumns.map((columnName) => {
              columnName = columnName as string;
              columnName =
                columnName.toString().charAt(0).toUpperCase() +
                columnName.slice(1);
              return [columnName, false];
            })
          ),
        },
      }}
      slots={{
        toolbar: CustomToolbar,
      }}
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
