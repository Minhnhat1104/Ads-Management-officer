import { Box, Button, IconButton, Stack, Theme, Tooltip, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import * as keyNames from './keyNames';
import { DeleteOutline, EditOutlined, Visibility } from '@mui/icons-material';

export const getMapColumns = () => {
  return {
    [keyNames.KEY_NAME_AD_WIDTH](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_AD_HEIGHT](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_AD_IMAGE](col: string, data: any) {
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
    [keyNames.KEY_NAME_AD_PLACEMENT_ID](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_AD_AMOUNT](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_AD_ADVERTISING_TYPE_ID](col: string, data: any) {
      return <Typography>{data?.[col]?.name || ''}</Typography>;
    },
    [keyNames.KEY_NAME_AD_ADVERTISEMENT_CONTRACT_ID](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_AD_ADVERTISING_TYPE](col: string, data: any) {
      return <Typography>{data?.[col]?.name || ''}</Typography>;
    },
    [keyNames.KEY_NAME_AD_ACTIONS](col: string, data: any, extra: any) {
      return (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Chỉnh sửa" placement="top">
            <IconButton size="small" onClick={() => extra?.handleEdit && extra?.handleEdit(data)} color="success">
              <EditOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa" placement="top">
            <IconButton size="small" onClick={() => extra?.handleDelete && extra?.handleDelete(data)} color="error">
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      );
    },
  };
};
