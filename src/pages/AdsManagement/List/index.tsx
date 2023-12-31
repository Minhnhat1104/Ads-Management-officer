import React from 'react';
import { useEffect, useMemo, useState } from 'react';

import { useTheme } from '@mui/material';
// project
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

import { LIST_TABLE_PAGE_SIZE, SET_TIMEOUT } from '@base/config/constants';

import { getMapColumns } from './Helper';
import * as keyNames from './keyNames';
import Toolbar from './Toolbar';
import { FieldsData, makeTable8Columns } from '@base/components/ReactTable8/Helper';
import ListTable, { ListTableProps } from '@base/components/List/ListTable';
import { usePlacements } from 'src/hooks/usePlacements';
import { ListPaginationProps } from '@base/components/List/ListPagination';

interface AdsManagementProps {}

const AdsManagement = (props: AdsManagementProps) => {
  const {} = props;
  const theme = useTheme();
  const queryClient = useQueryClient();

  // state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [openWrite, setOpenWrite] = useState<{
    sortId: string;
    isOpen: boolean;
  }>({ sortId: '', isOpen: false });
  const [keyword, setKeyword] = useState<string>('');
  const [paging, setPaging] = useState<{ page: number; size: number }>({ page: 1, size: LIST_TABLE_PAGE_SIZE });

  // call data
  const { data } = usePlacements();

  useEffect(() => {
    if (data) {
      setItems(data);
    } else {
      setItems([]);
    }
  }, [data]);

  // ========== Table ========
  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
    console.log(checkedIds);
  };

  const handleEdit = (sortId: string) => {
    setOpenWrite({
      sortId,
      isOpen: true,
    });
  };

  //table props
  const fields: FieldsData = [
    {
      languageKey: 'Phường',
      keyName: keyNames.KEY_NAME_PLACEMENT_WARD,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Quận',
      keyName: keyNames.KEY_NAME_PLACEMENT_DISTRICT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Trạng thái quy hoạch',
      keyName: keyNames.KEY_NAME_PLACEMENT_PLANNED,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Hình ảnh',
      keyName: keyNames.KEY_NAME_PLACEMENT_IMAGE,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Loại Đất',
      keyName: keyNames.KEY_NAME_PLACEMENT_LOCATIONTYPE,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Loại bảng quảng cáo',
      keyName: keyNames.KEY_NAME_PLACEMENT_FORMAT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: '',
      keyName: keyNames.KEY_NAME_PLACEMENT_ACTIONS,
      enableSorting: false,
      width: 50,
    },
  ];

  const tableColumns = useMemo(() => [...makeTable8Columns(fields, getMapColumns(), { handleEdit }, [])], []);

  const handlePagingChange = (page: number, size: number) => {
    const newPaging = { ...paging, page, size };
    setPaging && setPaging(newPaging);
  };

  // List paging
  // const pagingProps: ListPaginationProps = {
  //   pageTotal: data?.attr?.maxpage || 1, // page quantity
  //   pageCount: data?.attr?.total ? Number(data?.attr?.total) : 0, // total item quantity
  //   pageSize: paging?.size || LIST_TABLE_PAGE_SIZE,
  //   pageIndex: paging?.page || 1,
  // };

  const border = `1px solid ${theme.palette.divider}`;

  //render table list
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      onRowChecked: handleOnChecked,
      checkedIds: selectedIds,
      rows: items || [],
      // pagingProps,
      onPageChange: handlePagingChange,
      columns: tableColumns,
      sx: {
        px: 0,
        border,
        '& tbody': {
          border: 'none',
        },
      },
    };
    return <ListTable {...listTableProps} />;
  }, [
    items,
    tableColumns,
    // pagingProps
    selectedIds,
  ]);

  return (
    <>
      <Toolbar />
      {TableMemo}
    </>
  );
};

export default AdsManagement;
