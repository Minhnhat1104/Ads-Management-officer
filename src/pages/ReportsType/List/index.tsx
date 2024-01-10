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
import { useNavigate } from 'react-router';
import Write from '../Write';
import { queryKeys } from '@base/config/queryKeys';
import { useReportsType } from 'src/hooks/reportsType/useReportsType';
import { useReportsTypeMutation } from 'src/hooks/reportsType/useReportsTypeMutation';

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
  const { data } = useReportsType();
  const { mDelete } = useReportsTypeMutation();

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
          queryClient.invalidateQueries([queryKeys.reportsType]);
        }, SET_TIMEOUT);
      },
    });
  };

  //table props
  const fields: FieldsData = [
    {
      languageKey: 'Loại hình thức báo cáo',
      keyName: keyNames.KEY_NAME_REPORT_TYPE_NAME,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: '',
      keyName: keyNames.KEY_NAME_REPORT_TYPE_ACTIONS,
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
