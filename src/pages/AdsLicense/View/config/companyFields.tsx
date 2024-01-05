import dayjs from 'dayjs';
import { ViewFieldConfig } from '../ViewFields';
import { Chip } from '@mui/material';

export const companyFields: ViewFieldConfig[] = [
  {
    label: 'Tên công ty',
    value: 'name',
    getValue: (value: any, keyName: string) => value?.[keyName],
  },
  {
    label: 'Email',
    value: 'email',
    getValue: (value: any, keyName: string) => value?.[keyName],
  },
  {
    label: 'SĐT',
    value: 'phone',
    getValue: (value: any, keyName: string) => value?.[keyName],
  },
  {
    label: 'Địa chỉ',
    value: 'address',
    getValue: (value: any, keyName: string) => value?.[keyName],
  },
];
