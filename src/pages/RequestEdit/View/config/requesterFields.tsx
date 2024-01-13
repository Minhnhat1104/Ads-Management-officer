import { Box, Chip, Typography } from '@mui/material';
import { ViewFieldConfig } from '../ViewFields';
import dayjs from 'dayjs';

export const requesterFields: ViewFieldConfig[] = [
  {
    label: 'Tên',
    value: 'firstName',
  },
  {
    label: 'Họ',
    value: 'lastName',
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
    label: 'Vai trò',
    value: 'roleName',
    getValue(value, keyName) {
      return value === 'WARD' ? 'Cán bộ phường' : 'Cán bộ sở';
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
