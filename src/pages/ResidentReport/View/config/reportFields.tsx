import { Box, Chip, Typography } from '@mui/material';
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
      return value?.[keyName] ? dayjs(value?.[keyName]).format('DD/MM/YYYY HH:mm') : '';
    },
  },
  {
    label: 'Nội dung',
    value: 'content',
    getValue(value, keyName) {
      return value?.[keyName] ? (
        <Box dangerouslySetInnerHTML={{ __html: value?.[keyName] }} />
      ) : (
        'Không có nội dung báo cáo'
      );
    },
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
      return value?.[keyName] ? (
        <Box
          component="img"
          sx={{
            width: 350,
            height: 230,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="Image reported"
          src={value?.[keyName] || ''}
        />
      ) : (
        <Typography>Chưa có hình ảnh</Typography>
      );
    },
  },
  {
    label: 'Ảnh 2',
    value: 'secondImage',
    getValue(value, keyName) {
      return value?.[keyName] ? (
        <Box
          component="img"
          sx={{
            width: 350,
            height: 230,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="Image reported"
          src={value?.[keyName] || ''}
        />
      ) : (
        <Typography>Chưa có hình ảnh</Typography>
      );
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
