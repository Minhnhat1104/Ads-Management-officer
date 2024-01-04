import { Box, Chip } from '@mui/material';
import { ViewFieldConfig } from './ViewFields';

export const profileFields: ViewFieldConfig[] = [
  {
    label: 'Vai trò',
    value: 'roleName',
    getValue(value, keyName) {
      if (value.roleName === 'DEPARTMENT') return 'Cán bộ sở';
      return 'Cán bộ phường';
    },
  },
  {
    label: 'Họ và Tên',
    value: 'name',
    getValue(value, keyName) {
      return value?.firstName + ' ' + value?.lastName;
    },
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
    label: 'Địa bàn',
    value: 'phone',
    getValue(value, keyName) {
      return value.ward + ', ' + value?.district;
    },
  },
];
