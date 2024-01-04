import dayjs from 'dayjs';
import { ViewFieldConfig } from '../ViewFields';
import { Chip } from '@mui/material';

export const contractFields: ViewFieldConfig[] = [
  {
    label: 'Ngày bắt đầu',
    value: 'startDate',
    getValue(value, keyName) {
      return value?.[keyName] ? dayjs(value?.[keyName]).format('DD/MM/YYYY') : '';
    },
  },
  {
    label: 'Ngày kết thúc',
    value: 'endDate',
    getValue(value, keyName) {
      return value?.[keyName] ? dayjs(value?.[keyName]).format('DD/MM/YYYY') : '';
    },
  },
  {
    label: 'Trạng thái',
    value: 'state',
    getValue(value, keyName) {
      return (
        <>
          {value?.[keyName] === 1 ? (
            <Chip color="success" size="small" label="Đang hoạt động" />
          ) : (
            <Chip color="warning" size="small" label="Đã hết hạn" />
          )}
        </>
      );
    },
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
