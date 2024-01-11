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
import { LabelValue } from '@base/types';

interface ResidentReportProps {}

const ResidentReport = (props: ResidentReportProps) => {
  const {} = props;
  const theme = useTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [paging, setPaging] = useState<{ page: number; size: number }>({ page: 1, size: LIST_TABLE_PAGE_SIZE });
  const [ward, setward] = useState<LabelValue | null>(null);
  // call data
  const params = {
    ward: ward?.value || 'all',
    page: paging?.page,
    limit: paging?.size,
  };
  const { data } = useReports(params);

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
      languageKey: 'Thời điểm gửi',
      keyName: keyNames.KEY_NAME_REPORT_CREATED,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Phường',
      keyName: keyNames.KEY_NAME_REPORT_WARD,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Quận',
      keyName: keyNames.KEY_NAME_REPORT_DISTRICT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Họ',
      keyName: keyNames.KEY_NAME_REPORT_LAST_NAME,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Tên',
      keyName: keyNames.KEY_NAME_REPORT_FIRST_NAME,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Email',
      keyName: keyNames.KEY_NAME_REPORT_EMAIL,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'SĐT',
      keyName: keyNames.KEY_NAME_REPORT_PHONE,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Loại',
      keyName: keyNames.KEY_NAME_REPORT_TYPE,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Trạng thái',
      keyName: keyNames.KEY_NAME_REPORT_STATE,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Xem chi tiết',
      keyName: keyNames.KEY_NAME_REPORT_ACTIONS,
      enableSorting: false,
      width: 50,
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
      <Toolbar ward={ward} setward={setward} />
      {TableMemo}
    </>
  );
};

export default ResidentReport;
