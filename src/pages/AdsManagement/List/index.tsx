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
      languageKey: 'Thời gian gửi',
      keyName: keyNames.KEY_NAME_REPORT_TIMESENT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Họ và tên',
      keyName: keyNames.KEY_NAME_REPORT_FULLNAME,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Số điện thoại',
      keyName: keyNames.KEY_NAME_REPORT_PHONENUMBER,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Bảng quảng cáo',
      keyName: keyNames.KEY_NAME_REPORT_ADS_TABLE,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Địa chỉ đặt bảng quảng cáo',
      keyName: keyNames.KEY_NAME_REPORT_ADDRESS,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Loại hình báo cáo',
      keyName: keyNames.KEY_NAME_REPORT_ADS_TYPE,
      enableSorting: false,
      width: 100,
    },
    {
      languageKey: 'Tình trạng xử lý',
      keyName: keyNames.KEY_NAME_REPORT_ISPROCESSING,
      enableSorting: false,
      width: 100,
    },
    {
      languageKey: 'Chi tiết',
      keyName: 'Detail',
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
