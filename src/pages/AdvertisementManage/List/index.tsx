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
import { useDistricts } from 'src/hooks/district/useDistricts';
import { ListPaginationProps } from '@base/components/List/ListPagination';
import { useNavigate } from 'react-router';
import Write from '../Write';
import { useDistrictMutation } from 'src/hooks/district/useDistrictMutation';
import { queryKeys } from '@base/config/queryKeys';
import { useAdvertisements2, useAdvertisements2Mutation } from 'src/hooks/useAdvertisements';

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
  const { data } = useAdvertisements2();
  const { mDelete } = useAdvertisements2Mutation();

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
          queryClient.invalidateQueries([queryKeys.advertisement2]);
        }, SET_TIMEOUT);
      },
    });
  };

  //table props
  const fields: FieldsData = [
    {
      languageKey: 'Chiều dài',
      keyName: keyNames.KEY_NAME_AD_WIDTH,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Chiều rộng',
      keyName: keyNames.KEY_NAME_AD_HEIGHT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Hình ảnh',
      keyName: keyNames.KEY_NAME_AD_IMAGE,
      enableSorting: false,
      width: 'auto',
    },
    // {
    //   languageKey: 'Đeiẻm đặt',
    //   keyName: keyNames.KEY_NAME_AD_PLACEMENT_ID,
    //   enableSorting: false,
    //   width: 'auto',
    // },
    {
      languageKey: 'Số lượng',
      keyName: keyNames.KEY_NAME_AD_AMOUNT,
      enableSorting: false,
      width: 'auto',
    },
    // {
    //   languageKey: 'Loại',
    //   keyName: keyNames.KEY_NAME_AD_ADVERTISING_TYPE_ID,
    //   enableSorting: false,
    //   width: 'auto',
    // },
    // {
    //   languageKey: 'Quận',
    //   keyName: keyNames.KEY_NAME_AD_ADVERTISEMENT_CONTRACT_ID,
    //   enableSorting: false,
    //   width: 'auto',
    // },
    {
      languageKey: 'Loại',
      keyName: keyNames.KEY_NAME_AD_ADVERTISING_TYPE,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: '',
      keyName: keyNames.KEY_NAME_AD_ACTIONS,
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
