import { Box, Chip, Typography } from '@mui/material';
import { ViewFieldConfig } from '../ViewFields';
import dayjs from 'dayjs';

export const placementFields: ViewFieldConfig[] = [
  {
    label: 'Loại vị trí',
    value: 'locationType',
  },
  {
    label: 'Loại bảng quảng cáo',
    value: 'format',
  },
  {
    label: 'Trạng Thái Quy Hoạch',
    value: 'planned',
    getValue(value, keyName) {
      return <Typography>{value?.[keyName] ? 'Đã quy hoạch' : 'Chưa quy hoạch'}</Typography>;
    },
  },
  {
    label: 'Phường',
    value: 'ward',
  },
  {
    label: 'Quận',
    value: 'district',
  },
];
