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
import { LabelValue } from '@base/types';
import { FieldsData, makeTable8Columns } from '@base/components/ReactTable8/Helper';
import ListTable, { ListTableProps } from '@base/components/List/ListTable';
import { ListPaginationProps } from '@base/components/List/ListPagination';
import { dummyData } from './dummyData';
// import SortWritePage from '../Write';

interface AdsManagementProps {}

const AdsManagement = (props: AdsManagementProps) => {
  const {} = props;
  const theme = useTheme();
  const queryClient = useQueryClient();

  // state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [items, setItems] = useState<any[]>(dummyData);
  const [openWrite, setOpenWrite] = useState<{
    sortId: string;
    isOpen: boolean;
  }>({ sortId: '', isOpen: false });
  const [keyword, setKeyword] = useState<string>('');
  const [paging, setPaging] = useState<{ page: number; size: number }>({ page: 1, size: LIST_TABLE_PAGE_SIZE });

  // call data

  //init data
  // useEffect(() => {
  //   if (data?.rows) {
  //     if (!_.isEqual(items, data?.rows)) {
  //       setItems(data?.rows);
  //     }
  //   } else {
  //     setItems([]);
  //   }
  // }, [data]);

  // ========== Table ========
  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
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
      languageKey: 'Địa chỉ',
      keyName: keyNames.KEY_NAME_HOME_ADDRESS,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Khu vực',
      keyName: keyNames.KEY_NAME_HOME_SECTION,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Loại vị trí',
      keyName: keyNames.KEY_NAME_HOME_TYPE,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Hình thức quảng cáo',
      keyName: keyNames.KEY_NAME_HOME_ADS_FORM,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Hình ảnh điểm đặt bảng quảng cáp',
      keyName: keyNames.KEY_NAME_HOME_ADS_IMAGE,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Quy hoạch',
      keyName: keyNames.KEY_NAME_HOME_IS_ZONING,
      enableSorting: false,
      width: 100,
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
      // onRowChecked: handleOnChecked,
      // checkedIds: selectedIds,
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
