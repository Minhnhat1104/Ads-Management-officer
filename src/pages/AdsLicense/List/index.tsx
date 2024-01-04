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
import { ListPaginationProps } from '@base/components/List/ListPagination';
import { useNavigate } from 'react-router';
import { useReports } from 'src/hooks/useReports';
import { useRequests } from 'src/hooks/useRequests';

interface AdsManagementProps {}

const AdsManagement = (props: AdsManagementProps) => {
  const {} = props;
  const theme = useTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [paging, setPaging] = useState<{ page: number; size: number }>({ page: 1, size: LIST_TABLE_PAGE_SIZE });

  // call data
  const params = {
    page: paging?.page,
    limit: paging?.size,
  };
  const { data } = useRequests(params);

  useEffect(() => {
    if (data?.data) {
      setItems(data?.data);
    } else {
      setItems([]);
    }
  }, [data]);

  // ========== Table ========
  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
    console.log(checkedIds);
  };

  const gotoView = (data: any) => {
    navigate(`/resident-report/${data?.id}`);
  };

  //table props
  const fields: FieldsData = [
    {
      languageKey: 'Trạng thái',
      keyName: keyNames.KEY_NAME_REQUEST_STATUS,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Ngày tạo',
      keyName: keyNames.KEY_NAME_REQUEST_CREATEDAT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Công ty',
      keyName: keyNames.KEY_NAME_REQUEST_COMPANY,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Người gửi',
      keyName: keyNames.KEY_NAME_REQUEST_REQUESTER,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Email người gửi',
      keyName: keyNames.KEY_NAME_REQUEST_REQUEST_EMAIL,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Approver',
      keyName: keyNames.KEY_NAME_REQUEST_APPROVER,
      enableSorting: false,
      width: 'auto',
    },
  ];

  const tableColumns = useMemo(() => [...makeTable8Columns(fields, getMapColumns(), { gotoView }, [])], []);

  const handlePagingChange = (page: number, size: number) => {
    const newPaging = { ...paging, page, size };
    setPaging && setPaging(newPaging);
  };

  // List paging
  const pagingProps: ListPaginationProps = {
    pageTotal: data?.meta?.totalPages || 1, // page quantity
    pageCount: data?.meta?.totalItems ? Number(data?.meta?.totalItems) : 0, // total item quantity
    pageSize: paging?.size || LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.page || 1,
  };

  const border = `1px solid ${theme.palette.divider}`;

  //render table list
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      onRowChecked: handleOnChecked,
      checkedIds: selectedIds,
      rows: items || [],
      pagingProps,
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
