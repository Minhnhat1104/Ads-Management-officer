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
import { useNavigate, useParams } from 'react-router';
import { useAdvertisements } from 'src/hooks/useAdvertisements';
import AdvertisementWrite from '../AdvertisementWrite';

interface ViewProps {}

const View = (props: ViewProps) => {
  const {} = props;
  const theme = useTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const urlParams = useParams();
  const { id: placementId } = urlParams;

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
  const { data } = useAdvertisements(params, placementId);

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

  //table props
  const fields: FieldsData = [
    {
      languageKey: 'Chiều dài',
      keyName: keyNames.KEY_NAME_ADS_WIDTH,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Chiều rộng',
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
    // {
    //   languageKey: 'Hình ảnh',
    //   keyName: keyNames.KEY_NAME_ADS_PLACEMENT_ID,
    //   enableSorting: false,
    //   width: 'auto',
    // },
    {
      languageKey: 'Số Lượng',
      keyName: keyNames.KEY_NAME_ADS_AMOUNT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Loại',
      keyName: keyNames.KEY_NAME_ADS_ADVERTISING_TYPE,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Ngày hết hạn',
      keyName: keyNames.KEY_NAME_ADS_END_DATE,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: '',
      keyName: keyNames.KEY_NAME_ADS_END_ACTION,
      enableSorting: false,
      width: 50,
    },
  ];

  const tableColumns = useMemo(() => [...makeTable8Columns(fields, getMapColumns(), { handleEdit }, [])], []);

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
      <Toolbar placementId={placementId || ''} />
      {TableMemo}

      {openEdit?.open && (
        <AdvertisementWrite
          isOpen={openEdit.open}
          onClose={() => setOpenEdit({ open: false, data: null })}
          updateData={openEdit.data}
        />
      )}
    </>
  );
};

export default View;

// Programing Learning website for kid

// Cloud based storage system based on SeaWeedFS

// Entertainmain Photography software -> Anigan

// android: Entertainmain Photography software -> Anigan
