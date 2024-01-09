import { Box, Button, IconButton, Stack, Theme, Tooltip, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import * as keyNames from './keyNames';
import { EditOutlined, Visibility } from '@mui/icons-material';
import dayjs from 'dayjs';

export const getMapColumns = () => {
  return {
    [keyNames.KEY_NAME_ADS_WIDTH](col: string, data: any) {
      return <Typography>{data?.[col] ? data?.[col] + 'm' : ''}</Typography>;
    },
    [keyNames.KEY_NAME_ADS_HEIGHT](col: string, data: any) {
      return <Typography>{data?.[col] ? data?.[col] + 'm' : ''}</Typography>;
    },
    [keyNames.KEY_NAME_ADS_IMAGE](col: string, data: any) {
      return data?.[col] ? (
        <Box
          component="img"
          sx={{
            width: 350,
            height: 230,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="Ads."
          src={data?.[col] || ''}
        />
      ) : (
        <Typography>Chưa có hình ảnh</Typography>
      );
    },
    [keyNames.KEY_NAME_ADS_AMOUNT](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_ADS_ADVERTISING_TYPE](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_ADS_END_DATE](col: string, data: any, extra: any) {
      return <Typography>{data?.[col] ? dayjs(data?.[col]).format('DD/MM/YYYY') : ''}</Typography>;
    },
    [keyNames.KEY_NAME_ADS_END_ACTION](col: string, data: any, extra: any) {
      return (
        <Tooltip title="Yêu cầu chỉnh sửa bảng quảng cáo" placement="top">
          <IconButton
            size="small"
            // onClick={() => extra?.handleEdit && extra?.handleEdit(data)}
            color="success"
          >
            <EditOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      );
    },
  };
};
