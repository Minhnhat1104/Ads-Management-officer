import { Box, Chip } from '@mui/material';
import { ViewFieldConfig } from '../ViewFields';
import dayjs from 'dayjs';

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
    label: 'Thời điểm gửi báo cáo',
    value: 'created',
    getValue(value, keyName) {
      return value?.[keyName] ? dayjs(value?.[keyName]).format('DD/MM/YYYY') : '';
    },
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
          {value?.[keyName] === 1 ? (
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
    getValue(value, keyName) {
      return value?.[keyName] ? value : 'Không có ảnh minh hoạ';
    },
  },
  {
    label: 'Ảnh 2',
    value: 'secondImage',
    getValue(value, keyName) {
      return value?.[keyName] ? value : 'Không có ảnh minh hoạ';
    },
  },
  {
    label: 'Giải pháp',
    value: 'solution',
    getValue(value, keyName) {
      return value?.[keyName] ? <Box dangerouslySetInnerHTML={{ __html: value?.[keyName] }} /> : 'Chưa có giải pháp';
    },
  },
];
