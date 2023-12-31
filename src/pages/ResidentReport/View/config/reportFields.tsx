import { Box, Chip } from '@mui/material';
import { ViewFieldConfig } from '../ViewFields';

export const reportFields: ViewFieldConfig[] = [
  {
    label: 'Loại',
    value: 'type',
  },
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
    label: 'Nội dung',
    value: 'content',
  },
  {
    label: 'Trạng thái',
    value: 'state',
    getValue(value, keyName) {
      return (
        <>
          {value?.[keyName] ? (
            <Chip color="success" size="small" label="Đã xử lí" />
          ) : (
            <Chip color="warning" size="small" label="Chưa xử lí" />
          )}
        </>
      );
    },
  },
  {
    label: 'Ảnh 1',
    value: 'firstImage',
  },
  {
    label: 'Ảnh 2',
    value: 'secondImage',
  },
  {
    label: 'Giải pháp',
    value: 'solution',
    getValue(value, keyName) {
      return value?.[keyName] ? <Box dangerouslySetInnerHTML={{ __html: value?.[keyName] }} /> : '';
    },
  },
];
