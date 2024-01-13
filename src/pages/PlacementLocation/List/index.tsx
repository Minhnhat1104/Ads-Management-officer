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
import { usePlacementLocationType } from 'src/hooks/placementLocationType/usePlacementLocationType';
import { usePlacementLocationTypeMutation } from 'src/hooks/placementLocationType/usePlacementLocationTypeMutation';
import { usePlacement, usePlacements } from 'src/hooks/usePlacements';
import { usePlacementMutation } from 'src/hooks/usePlacementMutation';

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
  const { data } = usePlacements();
  const { mDelete } = usePlacementMutation();

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
          queryClient.invalidateQueries([queryKeys.placementLocationType]);
        }, SET_TIMEOUT);
      },
    });
  };

  //table props
  const fields: FieldsData = [
    {
      languageKey: 'Điểm đặt quảng cáo',
      keyName: keyNames.KEY_NAME_PLACEMENT_LOCATION_ADDRESSS,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Tung độ',
      keyName: keyNames.KEY_NAME_PLACEMENT_LOCATION_LAT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Vĩ độ',
      keyName: keyNames.KEY_NAME_PLACEMENT_LOCATION_LONG,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Quy hoạch',
      keyName: keyNames.KEY_NAME_PLACEMENT_LOCATION_PLANNED,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Loại điểm đặt',
      keyName: keyNames.KEY_NAME_PLACEMENT_LOCATION_TYPEID,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Hình thức',
      keyName: keyNames.KEY_NAME_PLACEMENT_LOCATION_FORMATID,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Phường',
      keyName: keyNames.KEY_NAME_PLACEMENT_LOCATION_WARDID,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: 'Quận',
      keyName: keyNames.KEY_NAME_PLACEMENT_LOCATION_DISTRICT,
      enableSorting: false,
      width: 'auto',
    },
    {
      languageKey: '',
      keyName: keyNames.KEY_NAME_PLACEMENT_LOCATION_ACTIONS,
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
