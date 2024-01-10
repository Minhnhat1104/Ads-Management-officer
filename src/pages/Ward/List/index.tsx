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
import { useWards } from 'src/hooks/ward/useWards';
import { ListPaginationProps } from '@base/components/List/ListPagination';
import { useNavigate } from 'react-router';
import Write from '../Write';
import { useWardMutation } from 'src/hooks/ward/useWardMutation';
import { queryKeys } from '@base/config/queryKeys';

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
  const { data } = useWards();
  const { mDelete } = useWardMutation();

  useEffect(() => {
    if (data && Array.isArray(data)) {
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

  const handleEdit = (data: any) => {
    setOpenEdit({ open: true, data: data });
  };

  const handleDelete = (data: any) => {
    const params: any = {
      id: data?.id,
    };
    mDelete.mutate(params, {
      onSuccess(data, variables, context) {
        setTimeout(() => {
          queryClient.invalidateQueries([queryKeys.wards]);
        }, SET_TIMEOUT);
      },
    });
  };

  //table props
  const fields: FieldsData = [
    {
      languageKey: 'Phường',
      keyName: keyNames.KEY_NAME_WARD_NAME,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Quận',
      keyName: keyNames.KEY_NAME_WARD_DISTRICT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Thời gian tạo',
      keyName: keyNames.KEY_NAME_WARD_CREATED_AT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Thời gian cập nhật',
      keyName: keyNames.KEY_NAME_WARD_UPDATED_AT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: '',
      keyName: keyNames.KEY_NAME_WARD_ACTIONS,
      enableSorting: false,
      width: 50,
    },
  ];

  const tableColumns = useMemo(
    () => [...makeTable8Columns(fields, getMapColumns(), { handleEdit, handleDelete }, [])],
    []
  );

  const border = `1px solid ${theme.palette.divider}`;

  //render table list
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      onRowChecked: handleOnChecked,
      checkedIds: selectedIds,
      rows: items || [],
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
        <Write
          isOpen={openEdit.open}
          onClose={() => setOpenEdit({ open: false, data: null })}
          updateData={openEdit.data}
        />
      )}
    </>
  );
};

export default List;
