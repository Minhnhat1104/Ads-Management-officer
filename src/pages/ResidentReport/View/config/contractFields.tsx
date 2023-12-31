import dayjs from 'dayjs';
import { ViewFieldConfig } from '../ViewFields';

export const contractFields: ViewFieldConfig[] = [
  {
    label: 'Phường',
    value: 'startDate',
    getValue(value, keyName) {
      return value?.[keyName] ? dayjs(value?.[keyName]).format('DD/MM/YYYY') : '';
    },
  },
  {
    label: 'Quận',
    value: 'endDate',
    getValue(value, keyName) {
      return value?.[keyName] ? dayjs(value?.[keyName]).format('DD/MM/YYYY') : '';
    },
  },
  {
    label: 'Trạng thái',
    value: 'state',
  },
  {
    label: 'Tên công ty',
    value: 'name',
    getValue: (value: any, keyName: string) => value?.company?.[keyName],
  },
  {
    label: 'Email',
    value: 'email',
    getValue: (value: any, keyName: string) => value?.company?.[keyName],
  },
  {
    label: 'SĐT',
    value: 'phone',
    getValue: (value: any, keyName: string) => value?.company?.[keyName],
  },
  {
    label: 'Địa chỉ',
    value: 'address',
    getValue: (value: any, keyName: string) => value?.company?.[keyName],
  },
];
