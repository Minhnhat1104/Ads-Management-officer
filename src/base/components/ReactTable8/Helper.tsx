import { Stack, Typography } from '@mui/material';

export interface Field<K extends string = string> {
  [key: string]: any;
  keyName: K;
  languageKey: string;
  defaultViewInList?: boolean;
  sortable?: boolean; // depreciated
  name?: string;
  title?: string;
  width?: string | number;
  minWidth?: string | number;
  namespace?: string;
  enableSorting?: boolean;
}
export type FieldsData<K extends string = string> = Field<K>[];

export const makeTable8Columns = (
  fields: FieldsData,
  columnRenderRemap: any,
  extraParams: any,
  hiddenColumns: string[]
) => {
  //react-table columns
  const newColumns: any[] = [];

  // loadDefaultColumns
  const columnRender = {
    // ...defaultColumnsRender,
    ...columnRenderRemap,
  };

  // render column order by setting
  fields.length > 0 &&
    fields.forEach((field: any) => {
      if (hiddenColumns.indexOf(field.keyName) !== -1) {
        return;
      }
      const column: any = {
        header: field.languageKey,
        accessorKey: field.keyName,
        enableColumnFilter: false,
        enableSorting: field?.enableSorting || field?.sortable ? true : false,
        width: field?.width ?? 'auto',
        minWidth: field?.minWidth ?? 'auto',
        namespace: field?.namespace ?? '',
      };

      // defaultRender
      let cellRenderFn = (col: string, data: any, extraParams: any = undefined) => {
        const dataType = typeof data[col];
        const renderData =
          dataType !== 'undefined'
            ? dataType === 'string' || dataType === 'number'
              ? data[col]
              : JSON.stringify(data[col])
            : '';
        return <>{renderData}</>;
      };

      if (typeof columnRender[field.keyName] !== 'undefined') {
        cellRenderFn = columnRender[field.keyName];
      }

      column.cell = (props: any) => {
        if (!props) {
          return null;
        }
        const col: string = field.keyName;
        const data: any = props.row.original;
        return cellRenderFn(col, data, extraParams);
      };

      newColumns.push(column);
    });

  return newColumns;
};
