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
import { useRequestEdits } from 'src/hooks/requestEdit/useRequestEdits';
import { useRequestEditMutation } from 'src/hooks/requestEdit/useRequestEditMutation';
import { queryKeys } from '@base/config/queryKeys';

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

  // call data
  const params = {
    page: paging?.page,
    limit: paging?.size,
  };
  const { data } = useRequestEdits(params);
  const { mPlacementApprove, mPlacementDeny, mAdApprove, mAdDeny } = useRequestEditMutation();

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
    navigate(`/request-edit/${data?.id}`);
  };

  const handleApprove = (data: any) => {
    const params = {
      id: data?.id,
    };
    if (data?.type === 'placement') {
      mPlacementApprove.mutate(params, {
        onSuccess(data, variables, context) {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.requestEdits]);
          }, SET_TIMEOUT);
        },
      });
    } else if (data?.type === 'advertisement') {
      mPlacementDeny.mutate(params, {
        onSuccess(data, variables, context) {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.requestEdits]);
          }, SET_TIMEOUT);
        },
      });
    }
  };

  const handleDeny = (data: any) => {
    const params = {
      id: data?.id,
    };
    if (data?.type === 'placement') {
      mAdApprove.mutate(params, {
        onSuccess(data, variables, context) {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.requestEdits]);
          }, SET_TIMEOUT);
        },
      });
    } else if (data?.type === 'advertisement') {
      mAdDeny.mutate(params, {
        onSuccess(data, variables, context) {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.requestEdits]);
          }, SET_TIMEOUT);
        },
      });
    }
  };

  //table props
  const fields: FieldsData = [
    {
      languageKey: 'Loại',
      keyName: keyNames.KEY_NAME_REQUEST_TYPE,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Người yêu cầu',
      keyName: keyNames.KEY_NAME_REQUEST_REQUESTER,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Email người yêu cầu',
      keyName: keyNames.KEY_NAME_REQUEST_REQUESTER_EMAIL,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Người xử lí',
      keyName: keyNames.KEY_NAME_REQUEST_APPROVER,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Email người xử lí',
      keyName: keyNames.KEY_NAME_REQUEST_APPROVER_EMAIL,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Thời điểm gửi',
      keyName: keyNames.KEY_NAME_REQUEST_CREATED_AT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Trạng thái',
      keyName: keyNames.KEY_NAME_REQUEST_STATUS,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Xử lý yêu cầu',
      keyName: keyNames.KEY_NAME_REQUEST_ACTIONS,
      enableSorting: false,
      width: 50,
    },
  ];

  const tableColumns = useMemo(
    () => [...makeTable8Columns(fields, getMapColumns(), { gotoView, handleApprove, handleDeny }, [])],
    []
  );

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

export default ResidentReport;
