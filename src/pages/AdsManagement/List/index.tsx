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
import axios from 'axios';
// import { dummyData } from './dummyData';
// import SortWritePage from '../Write';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/advertisement');
        setItems(response.data); // assuming the data is directly in the response
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

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
      languageKey: 'Địa điểm',
      keyName: keyNames.KEY_NAME_ADS_PLACEMENT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Chiều dài',
      keyName: keyNames.KEY_NAME_ADS_WIDTH,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Chiều cao',
      keyName: keyNames.KEY_NAME_ADS_HEIGHT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Hình ảnh',
      keyName: keyNames.KEY_NAME_ADS_IMAGE,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Số lượng',
      keyName: keyNames.KEY_NAME_ADS_AMOUNT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Loại bảng quảng cáo',
      keyName: keyNames.KEY_NAME_ADS_TYPE,
      enableSorting: false,
      width: 100,
    },
    // {
    //   languageKey: 'Tình trạng xử lý',
    //   keyName: keyNames.KEY_NAME_REPORT_ISPROCESSING,
    //   enableSorting: false,
    //   width: 100,
    // },
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
