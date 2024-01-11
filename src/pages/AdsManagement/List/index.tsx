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
import { usePlacements } from 'src/hooks/usePlacements';
import { ListPaginationProps } from '@base/components/List/ListPagination';
import { useNavigate } from 'react-router';
import PlacementWrite from '../PlacementWrite';

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
  const [openEdit, setOpenEdit] = useState<{ open: boolean; data: any }>({ open: false, data: null });

  // call data
  const params = {
    page: paging?.page,
    limit: paging?.size,
  };
  const { data } = usePlacements(params);

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
    navigate(`/ads-management/${data?.id}`);
  };

  const handleEdit = (data: any) => {
    setOpenEdit({ open: true, data: data });
  };

  const handleFilter = (label: any, value: any) => {
    console.log('LIST CHECK: ', label, value);
    let filteredItems;

    if (label === 'planned' && value === 'Đã quy hoạch') {
      filteredItems = data?.data.filter((item: { [x: string]: any }) => item[label] === true);
    } else if (label === 'planned' && value === 'Chưa quy hoạch') {
      filteredItems = data?.data.filter((item: { [x: string]: any }) => item[label] === false);
    } else {
      filteredItems = data?.data.filter((item: { [x: string]: any }) => item[label] === value);
    }

    setItems(filteredItems);
  };

  //table props
  const fields: FieldsData = [
    {
      languageKey: 'Địa chỉ',
      keyName: keyNames.KEY_NAME_PLACEMENT_ADDRESS,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Phường',
      keyName: keyNames.KEY_NAME_PLACEMENT_WARD,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Quận',
      keyName: keyNames.KEY_NAME_PLACEMENT_DISTRICT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Trạng thái quy hoạch',
      keyName: keyNames.KEY_NAME_PLACEMENT_PLANNED,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Loại Đất',
      keyName: keyNames.KEY_NAME_PLACEMENT_LOCATIONTYPE,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Loại bảng quảng cáo',
      keyName: keyNames.KEY_NAME_PLACEMENT_FORMAT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: '',
      keyName: keyNames.KEY_NAME_PLACEMENT_ACTIONS,
      enableSorting: false,
      width: 50,
    },
  ];

  const tableColumns = useMemo(() => [...makeTable8Columns(fields, getMapColumns(), { gotoView, handleEdit }, [])], []);

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
      <Toolbar fields={fields} items={items} onHandleFilter={handleFilter} />
      {TableMemo}

      {openEdit.open && (
        <PlacementWrite
          isOpen={openEdit.open}
          onClose={() => setOpenEdit({ open: false, data: null })}
          updateData={openEdit.data}
        />
      )}
    </>
  );
};

export default AdsManagement;
