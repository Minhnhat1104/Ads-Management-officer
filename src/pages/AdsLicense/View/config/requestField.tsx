import dayjs from 'dayjs';
import { ViewFieldConfig } from '../ViewFields';
import { LabelValue } from '@base/types';
import { Chip } from '@mui/material';
import { REQUEST_STATUS_OPTIONS } from 'src/constants';

export const requestField: ViewFieldConfig[] = [
  {
    label: 'Trạng thái',
    value: 'status',
    getValue(value, keyName) {
      const option =
        REQUEST_STATUS_OPTIONS.find((_option: LabelValue<string, number>) => _option?.value === value?.[keyName]) ||
        null;
      return <Chip label={option?.label || ''} size="small" color={option?.extra || 'secondary'} />;
    },
  },
  {
    label: 'Thời gian tạo',
    value: 'createdAt',
    getValue(value, keyName) {
      return value?.[keyName] ? dayjs(value?.[keyName]).format('DD/MM/YYYY HH:mm') : '';
    },
  },
  {
    label: 'Thời gian cập nhật',
    value: 'updatedAt',
    getValue(value, keyName) {
      return value?.[keyName] ? dayjs(value?.[keyName]).format('DD/MM/YYYY HH:mm') : '';
    },
  },
];
