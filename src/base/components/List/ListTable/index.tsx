import React from 'react';

import { Box, Stack, StackProps, SxProps, Typography, useTheme } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { Table as ReactTableType } from '@tanstack/table-core';

import { BaseListProps } from '@base/components/List/Interface';
import ListPagination from '@base/components/List/ListPagination';
import { ReactTable8, onSortByFunc } from '@base/components/ReactTable8';

import LoadMoreButton from './LoadMoreButton';

export interface LoadMoreProps {
  totalItems: number;
  nextCursor?: string; //last item id in current list
  onLoadMore?: (cursor: string | undefined) => void;
  isLoading?: boolean; //
}

export interface ListTableProps extends BaseListProps {
  sx?: StackProps['sx'];
  columns: ColumnDef<any>[];
  onSortBy?: onSortByFunc;
  footerRender?: (table: ReactTableType<any>) => React.ReactElement;
  setRowHover?: (row: any) => void;
  isRowSpanned?: boolean;
  loadMoreProps?: LoadMoreProps;
  isMultiSelection?: boolean; //enable multi selection in list, default equal to true
  isDraggable?: boolean; //enable drag amd drop rows on table
  sxPaging?: SxProps; //style props for pagination
  listTableHeaderProps?: any;
  isSmall?: boolean;
}

const ListTable = (props: ListTableProps) => {
  const {
    columns,
    rows = [],
    checkedIds = [],
    pagingProps,
    onPageChange,
    onRowChecked,
    onSortBy,
    footerRender,
    setRowHover,
    sx,
    isRowSpanned = false,
    primaryKey,
    loadMoreProps,
    isMultiSelection,
    isDraggable,
    sxPaging = { py: 1 },
    listTableHeaderProps,
    isSmall,
  } = props;
  //const { t } = useTranslation();
  const theme = useTheme();

  // translate if column.header is string
  const nColumns = columns.map((column: any) => {
    // return { ...column, header: column.hideTitle ? '' : typeof column?.header === 'string' ? t(column.header) : column.header };
    return {
      ...column,
      header: column.hideTitle ? (
        ''
      ) : typeof column?.header === 'string' ? (
        <Typography>{column.header}</Typography>
      ) : (
        column.header
      ),
    };
  });

  return (
    <Stack
      sx={{
        px: 0,
        mb: 0,
        overflow: 'auto',
        maxHeight: '100%',
        borderRadius: '4px',
        boxShadow: '0px 2px 25px 0px rgba(0, 0, 0, 0.05)',
        border: `1px solid ${theme.palette.divider}`,
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
          width: 0,
        },
        '& thead': {
          '& > tr': {
            position: 'sticky',
            backgroundColor: theme.palette.background.default,
            top: 0,
            zIndex: 1,
          },
        },
        '& tbody tr td': { py: 1 },
        ...sx,
      }}
    >
      <ReactTable8
        columns={nColumns}
        data={rows}
        paging={pagingProps ?? { pageSize: rows?.length ?? 10 }}
        rowSelected={checkedIds}
        onRowSelect={onRowChecked}
        onSortBy={onSortBy}
        footerRender={footerRender}
        setRowHover={setRowHover}
        isRowSpanned={isRowSpanned}
        primaryKey={primaryKey}
        isMultiSelection={isMultiSelection}
        isDraggable={isDraggable}
      />
      {/* I using this load more to get more Data from Server without changing page */}
      {loadMoreProps && <LoadMoreButton {...loadMoreProps} />}
      {pagingProps && (
        <ListPagination
          gotoPage={(page: number) => onPageChange && onPageChange(page, pagingProps.pageSize)}
          setPageSize={(size: number, pageIndex) =>
            onPageChange && onPageChange(pageIndex ?? pagingProps.pageIndex, size)
          }
          pageSize={pagingProps.pageSize}
          pageIndex={pagingProps.pageIndex}
          pageTotal={pagingProps.pageTotal}
          pageCount={pagingProps.pageCount}
          sx={sxPaging}
          isSmall={isSmall}
        />
      )}
    </Stack>
  );
};

export default ListTable;
