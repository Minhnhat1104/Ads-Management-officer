import { Box, Typography } from '@mui/material';
import { ViewFieldConfig } from '../ViewFields';

export const advertisementFields: ViewFieldConfig[] = [
  {
    label: 'Chiều dài',
    value: 'width',
  },
  {
    label: 'Chiều rộng',
    value: 'height',
  },
  {
    label: 'Hình ảnh',
    value: 'image',
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
          alt="Image advertisement"
          src={value?.[keyName] || ''}
        />
      ) : (
        <Typography>Chưa có hình ảnh</Typography>
      );
    },
  },
  {
    label: 'Số lượng',
    value: 'amount',
  },
  {
    label: 'Loại quảng cáo',
    value: 'advertisingType',
  },
];
