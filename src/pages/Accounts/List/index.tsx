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
import { queryKeys } from '@base/config/queryKeys';
import { useAccounts } from 'src/hooks/account/useAccounts';
import { useAccountMutation } from 'src/hooks/account/useAccountMutation';
import InfoEdit from '../InfoEdit';

interface ListProps {}

const List = (props: ListProps) => {
  const {} = props;
  const theme = useTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [paging, setPaging] = useState<{ page: number; size: number }>({ page: 1, size: LIST_TABLE_PAGE_SIZE });
  const [openEdit, setOpenEdit] = useState<{ open: boolean; data: any }>({ open: false, data: null });

  // call data
  const params = {
    page: paging?.page,
    limit: paging?.size,
  };
  const { data } = useAccounts(params);
  const { mDelete } = useAccountMutation();

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

  const handleEdit = (data: any) => {
    setOpenEdit({ open: true, data: data });
  };

  const handleDelete = (data: any) => {
    const params = {
      id: data?.id,
    };
    mDelete.mutate(params, {
      onSuccess(data, variables, context) {
        setTimeout(() => {
          queryClient.invalidateQueries([queryKeys.accounts]);
        }, SET_TIMEOUT);
      },
    });
  };

  //table props
  const fields: FieldsData = [
    {
      languageKey: 'Tên',
      keyName: keyNames.KEY_NAME_ACCOUNT_FIRST_NAME,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Họ',
      keyName: keyNames.KEY_NAME_ACCOUNT_LAST_NAME,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Emaill',
      keyName: keyNames.KEY_NAME_ACCOUNT_EMAIL,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Thời gian tạo',
      keyName: keyNames.KEY_NAME_ACCOUNT_CREATED_AT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Thời gian cập nhật',
      keyName: keyNames.KEY_NAME_ACCOUNT_UPDATED_AT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Vai trò',
      keyName: keyNames.KEY_NAME_ACCOUNT_ROLE_NAME,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Phường',
      keyName: keyNames.KEY_NAME_ACCOUNT_WARD,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Quận',
      keyName: keyNames.KEY_NAME_ACCOUNT_DISTRICT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: '',
      keyName: keyNames.KEY_NAME_ACCOUNT_ACTIONS,
      enableSorting: false,
      width: 50,
    },
  ];

  const tableColumns = useMemo(
    () => [...makeTable8Columns(fields, getMapColumns(), { handleEdit, handleDelete }, [])],
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

      {openEdit.open && (
        <InfoEdit
          isOpen={openEdit.open}
          onClose={() => setOpenEdit({ open: false, data: null })}
          updateData={openEdit.data}
        />
      )}
    </>
  );
};

export default List;
