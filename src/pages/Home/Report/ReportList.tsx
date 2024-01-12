import * as React from 'react';
import { Box, ClickAwayListener, Stack, Typography, useTheme } from '@mui/material';
import { LabelValue } from '@base/types';
import NoData from '@base/components/NoData';
import dayjs from 'dayjs';
import { REPORT_STATUS_OPTIONS } from 'src/constants';

interface ReportListProps {
  boardData: any;
  setBoardData: React.Dispatch<any>;
}

interface FieldConfig extends LabelValue {
  getValue?: (value: any, keyName: string) => string | number;
}

const advertisementFields: FieldConfig[] = [
  {
    label: 'Địa chỉ',
    value: 'address',
  },
  {
    label: 'Phường',
    value: 'ward',
  },
  {
    label: 'Quận',
    value: 'district',
  },
  {
    label: 'Tên',
    value: 'name',
    getValue: (value: any, keyName: string) => value?.last_name + ' ' + value?.first_name,
  },
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'SĐT',
    value: 'phone',
  },
  {
    label: 'Trạng thái',
    value: 'state',
    getValue: (value: any, keyName: string) => {
      const option =
        REPORT_STATUS_OPTIONS.find((_option: LabelValue<string, number>) => _option?.value === value?.[keyName]) ||
        null;
      return option?.label || '';
    },
  },
  {
    label: 'Loại',
    value: 'type',
  },
  {
    label: 'Thời gian tạo',
    value: 'created',
    getValue: (value: any, keyName: string) =>
      value?.[keyName] ? dayjs(value?.[keyName]).format('DD/MM/YYYY HH:mm') : '',
  },
];

function ReportList(props: ReportListProps) {
  const { boardData, setBoardData } = props;
  const theme = useTheme();

  const border = `1px solid ${theme.palette.divider}`;

  return (
    <ClickAwayListener
      onClickAway={() => {
        setBoardData(null);
      }}
    >
      <Stack
        width={400}
        maxHeight={300}
        className="scroll-box"
        sx={{ overflowY: 'auto' }}
        border={border}
        p={1}
        spacing={1}
      >
        {advertisementFields?.map((_field: FieldConfig) => (
          <Stack key={_field.value} direction="row" spacing={0.5}>
            <Typography fontWeight={500}>{`${_field.label}:`}</Typography>
            <Typography>
              {_field?.getValue ? _field?.getValue(boardData, _field.value) : boardData[_field.value]}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </ClickAwayListener>
  );
}

export default React.memo(ReportList);
