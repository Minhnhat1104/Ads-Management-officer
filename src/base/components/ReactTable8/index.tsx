import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable } from 'react-beautiful-dnd';
import ReactDOM from 'react-dom';

import { grey } from '@ant-design/colors';
import { ArrowDropDownOutlined, ArrowDropUpOutlined, DisabledByDefaultOutlined } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import {
  ColumnDef,
  Table as ReactTableType,
  RowData,
  //Column,
  //ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  //Table,
  useReactTable,
} from '@tanstack/react-table';
import { isEmpty, reduce } from 'lodash';

import Nodata from './Nodata';

// types
import { SortDirection } from '@tanstack/react-table';

//portal for dragging
const portal = document.createElement('tbody');
document.body.appendChild(portal);

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateTableData: (value: unknown) => void;
    updateCellData: (rowIndex: number, columnId: string, value: unknown) => void;
    removeTableRow: (rowIndex: number, columnId: string) => void;
    updateHeaderData?: (columnIdx: number, value: unknown) => void;
  }
}

const TableHeadCell = styled(Box)({
  fontSize: '14px !important',
  textTransform: 'capitalize',
  whiteSpace: 'nowrap',
});

// ==============================|| HEADER SORT ||============================== //

interface HeaderSortProps {
  column: any;
  sort?: boolean;
}

export const HeaderSort = ({ column, sort }: HeaderSortProps) => {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ display: 'inline-flex' }}>
      <Box>{column.render('Header')}</Box>
      {!column.disableSortBy && (
        <Stack
          sx={{ color: theme.palette.grey[300] }}
          {...(sort && { ...column.getHeaderProps(column.getSortByToggleProps()) })}
        >
          <ArrowDropUpOutlined
            style={{
              fontSize: '0.625rem',
              color: column.isSorted && !column.isSortedDesc ? theme.palette.secondary.main : 'inherit',
            }}
          />
          <ArrowDropDownOutlined
            style={{
              fontSize: '0.625rem',
              marginTop: -2,
              color: column.isSortedDesc ? theme.palette.secondary.main : 'inherit',
            }}
          />
        </Stack>
      )}
    </Stack>
  );
};

// ==============================|| SELECTION - PREVIEW ||============================== //

export const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }: { indeterminate: any }, ref: any) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  return <Checkbox indeterminate={indeterminate} ref={resolvedRef} {...rest} />;
});

export const TableRowSelection = ({ selected }: { selected: number }) => (
  <>
    {selected > 0 && (
      <Chip
        size="small"
        label={`${selected} row(s) selected`}
        color="secondary"
        variant="light"
        sx={{
          position: 'absolute',
          right: -1,
          top: -1,
          borderRadius: '0 4px 0 4px',
        }}
      />
    )}
  </>
);

// ==============================|| DRAG & DROP - DRAGGABLE HEADR ||============================== //

// ==============================|| DRAG & DROP - DRAG PREVIEW ||============================== //

// ==============================|| COLUMN HIDING - SELECT ||============================== //

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

export const HidingSelect = ({ hiddenColumns, setHiddenColumns, allColumns }: any) => {
  const handleChange = (event: SelectChangeEvent<typeof hiddenColumns>) => {
    const {
      target: { value },
    } = event;

    setHiddenColumns(typeof value === 'string' ? value.split(',') : value!);
  };

  return (
    <FormControl sx={{ width: 200 }}>
      <Select
        id="column-hiding"
        multiple
        displayEmpty
        value={hiddenColumns}
        onChange={handleChange}
        input={<OutlinedInput id="select-column-hiding" placeholder="select column" />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <Typography variant="subtitle1">all columns visible</Typography>;
          }

          if (selected.length > 0 && selected.length === allColumns.length) {
            return <Typography variant="subtitle1">all columns hidden</Typography>;
          }

          return <Typography variant="subtitle1">{selected.length} column(s) hidden</Typography>;
        }}
        MenuProps={MenuProps}
        size="small"
      >
        {allColumns.map((column: any, index: number) => (
          <MenuItem key={column.id} value={column.id}>
            <Checkbox
              checked={hiddenColumns!.indexOf(column.id) > -1}
              color="error"
              checkedIcon={
                <Box
                  className="icon"
                  sx={{
                    width: 16,
                    height: 16,
                    border: '1px solid',
                    borderColor: 'inherit',
                    borderRadius: 0.25,
                    position: 'relative',
                  }}
                >
                  <DisabledByDefaultOutlined className="filled" style={{ position: 'absolute' }} />
                </Box>
              }
            />
            <ListItemText primary={typeof column.Header === 'string' ? column.Header : column?.title} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

// ==============================|| COLUMN SORTING - SELECT ||============================== //

export const SortingSelect = ({ sortBy, setSortBy, allColumns }: any) => {
  const [sort, setSort] = useState(sortBy);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setSort(value);
    setSortBy([{ id: value, desc: false }]);
  };

  return (
    <FormControl sx={{ width: 200 }}>
      <Select
        id="table-sorting-select"
        size="small"
        displayEmpty
        value={sort}
        onChange={handleChange}
        input={<OutlinedInput id="select-sorting" placeholder="Sort by" />}
        renderValue={(selected) => {
          const selectedColumn = allColumns.filter((column: any) => column.id === selected)[0];
          if (!selected) {
            return <Typography variant="subtitle1">Sort By</Typography>;
          }
          return (
            <Typography variant="subtitle2">
              Sort by ({typeof selectedColumn.Header === 'string' ? selectedColumn.Header : selectedColumn?.title})
            </Typography>
          );
        }}
      >
        {allColumns
          .filter((column: any) => column.canSort)
          .map((column: any) => (
            <MenuItem key={column.id} value={column.id}>
              <ListItemText primary={typeof column.Header === 'string' ? column.Header : column?.title} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

// ==============================|| REACT-TABLE-8 ||============================== //

export type onSortByFunc = (clName: string | any, sortDirection: SortDirection | false) => void;
interface Table8Props {
  columns: any[];
  data: any[];
  paging?: any;
  rowSelected?: string[];
  isMultiSelection?: boolean; //enable multi row selected or single row selected
  primaryKey?: string; // primary key for onRowSelect function
  onRowSelect?: (params: any) => void;
  onSortBy?: onSortByFunc;
  onPageChange?: (page: number, size: number) => void;
  footerRender?: (table: ReactTableType<any>) => React.ReactElement;
  setRowHover?: (row: any) => void;
  isRowSpanned?: boolean;
  isDraggable?: boolean;
}

export const ReactTable8 = (props: Table8Props) => {
  const {
    columns = [],
    data = [],
    paging = {
      pageTotal: 0,
      pageCount: 0,
      pageIndex: 1,
      pageSize: 10,
    },
    isMultiSelection = true,
    rowSelected, //outside
    primaryKey = 'id',
    onRowSelect,
    onSortBy,
    footerRender,
    setRowHover,
    isRowSpanned,
    isDraggable,
  } = props;

  const theme = useTheme();

  // state
  const initialRowSelection = reduce(
    rowSelected,
    (f: any, id) => {
      f[id] = true;
      return f;
    },
    {}
  );
  const [rowSelection, setRowSelection] = React.useState<any>(initialRowSelection);
  //const [tablePaging, setTablePaging] = React.useState<any>(paging);

  //table definition
  const table = useReactTable({
    data: data || [],
    columns,
    state: { rowSelection },
    enableMultiRowSelection: isMultiSelection,
    onRowSelectionChange: setRowSelection,
    //option
    getRowId(originalRow: any, index: number, parent?: any) {
      // return row id in select row
      return parent ? [parent[primaryKey], originalRow[primaryKey]].join('.') : originalRow[primaryKey];
    },
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    //
    manualSorting: true, //server-side sorting
    debugTable: false,
  });

  // callback selected rows
  useEffect(() => {
    //console.log(rowSelection, 'rowSelection');
    if (Object.keys(rowSelection).length > 0) {
      if (JSON.stringify(initialRowSelection) !== JSON.stringify(rowSelection)) {
        onRowSelect && onRowSelect(Object.keys(rowSelection)); //onChange
      }
    } else {
      onRowSelect && onRowSelect([]);
    }
  }, [rowSelection]);

  // listen row selected
  useEffect(() => {
    // console.log('rowSelected', rowSelected);
    // console.log('rowSelection', rowSelection);
    if (isEmpty(rowSelected) && Object.keys(rowSelection).length > 0) {
      setRowSelection({});
    } else {
      if (JSON.stringify(initialRowSelection) !== JSON.stringify(rowSelection)) {
        setRowSelection(initialRowSelection);
      }
    }
  }, [rowSelected]);

  // initial state - SECONDS PROPS IS STATE
  useEffect(() => {
    // sorting state
    if (paging?.sorts?.length > 0) {
      const sortingState: any[] = [];
      paging.sorts.map((_sort: any) => {
        if (_sort.field) {
          sortingState.push({ id: _sort.field, desc: _sort?.orderBy === 2 ? true : false }); //desc = 2
        }
      });
      table.setSorting(sortingState);
    }

    // paging state
    // if (paging?.pageSize) {
    //   table.setPageSize(paging?.pageSize || 10);
    // } else {
    //   table.setPageSize(10); //default
    // }
  }, [paging]);

  const [items, setListItems] = useState<any>(table.getRowModel().rows);

  useEffect(() => {
    setListItems(table.getRowModel().rows);
  }, [table.getRowModel().rows]); // update ListItem on data change in Draggable

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const listCopy: any[] = [...items];
    const movedItem = listCopy.find((item) => item.id == result.draggableId);
    const listRemoved = listCopy.filter((item) => item.id != result.draggableId);
    if (movedItem) listRemoved.splice(result.destination.index, 0, movedItem);
    setListItems(listRemoved);
  };
  function renderDraggableItem(provided: DraggableProvided, snapshot: DraggableStateSnapshot, item: any) {
    const child = (
      <TableRow
        ref={provided.innerRef}
        {...provided.draggableProps}
        key={item.id}
        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        onMouseEnter={() => {
          setRowHover && setRowHover(item);
        }}
        onMouseLeave={() => {
          setRowHover && setRowHover(undefined);
        }}
        sx={{
          height: 55,
          // cursor: 'pointer',
          bgcolor: item.getIsSelected() ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit',
        }}
      >
        {item.getVisibleCells().map((cell: any, ceIdx: number) => {
          if (isRowSpanned) {
            if (cell.getValue()?.rowSpan) {
              if (cell.getValue().isRowSpanned) {
                return null;
              } else {
                return (
                  <TableCell
                    sx={{
                      '&.MuiTableCell-root:first-of-type ': {
                        padding: 1,
                        //pl: '24px !important' //WHY ADD THIS? fix wrong display first-type on rowspanned
                      },
                      // ...(ceIdx != 0 && { borderLeft: `1px solid ${theme.palette.divider}` }), //only border right and left on spanned cell
                      // ...(ceIdx + 1 < row.getVisibleCells().length && { borderRight: `1px solid ${theme.palette.divider}` }),
                      position: 'relative',
                    }}
                    rowSpan={cell.getValue()?.rowSpan}
                    key={ceIdx}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              }
            } else {
              return (
                <TableCell
                  key={ceIdx}
                  sx={{ position: 'relative' }} // to display child absolute
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            }
          }
          return cell.column.id === 'moveicon' ? (
            <TableCell
              key={ceIdx}
              sx={{ position: 'relative' }} // to display child absolute
              {...provided.dragHandleProps} // only dragHandle on icon
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ) : (
            <TableCell
              key={ceIdx}
              sx={{ position: 'relative' }} // to display child absolute
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          );
        })}
      </TableRow>
    );

    if (snapshot.isDragging) {
      return ReactDOM.createPortal(child, portal);
    }
    return child;
  }

  //render
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 'none',
        // border: `1px solid ${theme.palette.divider}`
      }}
    >
      <Table size="medium">
        <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: '#F5F6FA' }}>
          {table.getHeaderGroups().map((headerGroup: any, groupIdx: number) => (
            // sx={{ '& > th:first-of-type': { width: '58px' } }}
            <TableRow key={groupIdx}>
              {headerGroup.headers.map((header: any, cIdx: number) => {
                //console.log('table header', header.getContext());
                //console.log('getCanSort', header.column.getCanSort());
                //console.log('getIsSorted', header.column.getIsSorted());
                return (
                  <TableCell
                    key={`${groupIdx}-${cIdx}`}
                    colSpan={header.colSpan}
                    sx={{
                      minWidth: header?.column?.columnDef?.minWidth ?? 'auto',
                      width: header?.column?.columnDef?.width ?? header?.column?.getSize(),
                      // p: 0.5,
                      // pl: 3
                    }}
                    onClick={() => {
                      if (header.column.getCanSort()) {
                        header.column.toggleSorting();
                        // sort on server
                        onSortBy && onSortBy(header.column.id, header.column.getNextSortingOrder());
                      }
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      // justifyContent="space-between"
                      // sx={{ display: 'inline-flex' }}
                    >
                      <TableHeadCell
                        sx={{
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHeadCell>
                      {header.column.getCanSort() && (
                        <Stack spacing={0.5} sx={{ color: theme.palette.grey[300] }}>
                          <ArrowDropUpOutlined
                            fontSize="small"
                            style={{
                              // fontSize: '1.525rem',
                              color:
                                header.column.getCanSort() && header.column.getIsSorted() === 'asc'
                                  ? theme.palette.secondary.main
                                  : 'inherit',
                            }}
                          />
                          <ArrowDropDownOutlined
                            fontSize="small"
                            style={{
                              // fontSize: '1.525rem',
                              marginTop: '-14px',
                              color: header.column.getIsSorted() === 'desc' ? theme.palette.secondary.main : 'inherit',
                            }}
                          />
                        </Stack>
                      )}
                    </Stack>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        {isDraggable ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="table-body">
              {(provided, snapshot) => (
                <TableBody
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                >
                  {items &&
                    items.map((_ele: any, _index: number) => (
                      <Draggable key={_ele.id} draggableId={_ele.id.toString()} index={_index}>
                        {(provided, snapshot) => <>{renderDraggableItem(provided, snapshot, _ele)}</>}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  {data.length === 0 && <Nodata colspan={columns.length} />}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <TableBody sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
            {table.getRowModel().rows.map((row: any, rIdx: number) => {
              return (
                <TableRow
                  onMouseEnter={() => {
                    setRowHover && setRowHover(row);
                  }}
                  onMouseLeave={() => {
                    setRowHover && setRowHover(undefined);
                  }}
                  key={rIdx}
                  sx={{
                    height: 55,
                    // cursor: 'pointer',
                    bgcolor: row.getIsSelected() ? alpha(theme.palette.secondary.light, 0.35) : 'inherit',
                    '&.MuiTableRow-root:hover ': {
                      bgcolor: row.getIsSelected() ? alpha(theme.palette.secondary.light, 0.35) : 'inherit',
                    },
                  }}
                >
                  {row.getVisibleCells().map((cell: any, ceIdx: number) => {
                    if (isRowSpanned) {
                      if (cell.getValue()?.rowSpan) {
                        if (cell.getValue().isRowSpanned) {
                          return null;
                        } else {
                          return (
                            <TableCell
                              sx={{
                                '&.MuiTableCell-root:first-of-type ': {
                                  padding: 1,
                                  pl: '24px !important', // fix wrong display first-type on rowspanned
                                },
                                // ...(ceIdx != 0 && { borderLeft: `1px solid ${theme.palette.divider}` }), //only border right and left on spanned cell
                                // ...(ceIdx + 1 < row.getVisibleCells().length && { borderRight: `1px solid ${theme.palette.divider}` }),
                                position: 'relative',
                              }}
                              rowSpan={cell.getValue()?.rowSpan}
                              key={ceIdx}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          );
                        }
                      } else {
                        return (
                          <TableCell
                            key={ceIdx}
                            sx={{ position: 'relative' }} // to display child absolute
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        );
                      }
                    }
                    return (
                      <TableCell sx={{ position: 'relative' }} key={ceIdx}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {data.length === 0 && <Nodata colspan={columns.length} />}
          </TableBody>
        )}

        {!!footerRender && footerRender(table)}
      </Table>
    </TableContainer>
  );
};

// ==============================|| REACT-EDITABLE-8 ||============================== //

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

interface ReactEditable8Props {
  sx?: any;
  paging?: { pageIndex: number; pageSize: number };
  editableColumn?: any;
  columns: any[];
  data: any[];
  setData: (val: any[]) => void;
}

export const ReactEditable8 = (props: ReactEditable8Props) => {
  const { editableColumn, data, columns, paging, setData, sx } = props;
  const theme = useTheme();
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  // Give our default column cell renderer editing superpowers!
  const defaultColumn: Partial<ColumnDef<any>> = {
    cell: function Cell({ getValue, row: { index }, column: { id }, table }) {
      //console.log('row index', index);
      //console.log('column id', id);
      const initialValue = getValue();
      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue);
      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateCellData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return (
        <TextField
          variant="standard"
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            '& .MuiInputBase-root.Mui-focused': {
              border: `1px solid ${theme.palette.primary[400]}`,
              borderRadius: 1,
              p: 0.5,
            },
          }}
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    },
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn: editableColumn ? editableColumn : defaultColumn,
    state: {
      pagination: paging ? paging : { pageIndex: 0, pageSize: 100 },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateTableData: (value) => {
        // Skip index reset until after next rerender
        skipAutoResetPageIndex();
        setData(value as any);
      },
      updateCellData: (rowIndex, columnId, value) => {
        // Skip index reset until after next rerender
        skipAutoResetPageIndex();
        const old = [...data];
        const newData = old.map((row: any, index: number) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex]!,
              [columnId]: value,
            };
          }
          return row;
        });
        //console.log('newData', newData);
        setData(newData);
      },
      removeTableRow: (rowIndex, columnId) => {
        // Skip index reset until after next rerender
        skipAutoResetPageIndex();
        const newData = [...data];
        newData.splice(rowIndex, 1);
        setData(newData);
      },
    },
    debugTable: false,
  });

  //render
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}`, ...sx }}>
      <Table size="small">
        <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
          {table.getHeaderGroups().map((headerGroup: any, groupIdx: number) => (
            <TableRow key={groupIdx}>
              {headerGroup.headers.map((header: any, cIdx: number) => {
                //console.log('table header', header);
                //console.log('getCanSort', header.column.getCanSort());
                //console.log('getIsSorted', header.column.getIsSorted());
                // return (
                //   <TableCell
                //     key={`${groupIdx}-${cIdx}`}
                //     colSpan={header.colSpan}
                //     sx={{
                //       minWidth: header?.column?.columnDef?.minWidth ?? 'auto',
                //       width: header?.column?.columnDef?.width ?? header?.column?.getSize(),
                //       p: 0.5
                //     }}
                //   >
                //     <Stack
                //       direction="row"
                //       spacing={1}
                //       alignItems="center"
                //       justifyContent="space-between"
                //     >
                //       <TableHeadCell>{flexRender(header.column.columnDef.header, header.getContext())}</TableHeadCell>
                //     </Stack>
                //   </TableCell>
                // );
                return (
                  <TableCell
                    key={`${groupIdx}-${cIdx}`}
                    colSpan={header.colSpan}
                    sx={{
                      minWidth: header?.column?.columnDef?.minWidth ?? 'auto',
                      height: header?.column?.columnDef?.height ?? 'auto',
                      width: header?.column?.columnDef?.width ?? header?.column?.getSize(),
                      // p: 0.5,
                      // pl: 3
                    }}
                    onClick={() => {
                      if (header.column.getCanSort()) {
                        header.column.toggleSorting();
                        // sort on server
                        // onSortBy && onSortBy(header.column.id, header.column.getNextSortingOrder());
                      }
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="space-between"
                      // sx={{ display: 'inline-flex' }}
                    >
                      <TableHeadCell>{flexRender(header.column.columnDef.header, header.getContext())}</TableHeadCell>
                      {/* {header.column.getCanSort() && (
                        <Stack sx={{ color: 'secondary.light' }}>
                          <KeyboardArrowUp
                            fontSize="small"
                            style={{
                              // fontSize: '1.525rem',
                              color:
                                header.column.getCanSort() && header.column.getIsSorted() === 'asc'
                                  ? theme.palette.text.secondary
                                  : 'inherit'
                            }}
                          />
                          <KeyboardArrowDown
                            fontSize="small"
                            style={{
                              // fontSize: '1.525rem',
                              marginTop: '-8px',
                              color: header.column.getIsSorted() === 'desc' ? theme.palette.text.secondary : 'inherit'
                            }}
                          />
                        </Stack>
                      )} */}
                    </Stack>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row: any, rIdx: number) => {
            return (
              <TableRow
                key={rIdx}
                sx={{
                  height: 55,
                  //cursor: 'pointer',
                  bgcolor: row.getIsSelected() ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit',
                }}
              >
                {row.getVisibleCells().map((cell: any, ceIdx: number) => {
                  return <TableCell key={ceIdx}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>;
                })}
              </TableRow>
            );
          })}
          {data.length === 0 && <Nodata colspan={columns.length} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
