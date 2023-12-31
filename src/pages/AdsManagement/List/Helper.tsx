import { Box, Button, IconButton, Stack, Theme, Tooltip, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import * as keyNames from './keyNames';
import { Visibility } from '@mui/icons-material';

export const getMapColumns = () => {
  return {
    [keyNames.KEY_NAME_PLACEMENT_WARD](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_PLACEMENT_DISTRICT](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_PLACEMENT_PLANNED](col: string, data: any) {
      return <Typography>{data?.[col] ? 'Đã quy hoạch' : 'Chưa quy hoạch'}</Typography>;
    },
    [keyNames.KEY_NAME_PLACEMENT_IMAGE](col: string, data: any) {
      return data?.[col] ? (
        <Box
          component="img"
          sx={{
            height: 230,
            width: 350,
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
    [keyNames.KEY_NAME_PLACEMENT_LOCATIONTYPE](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_PLACEMENT_FORMAT](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_PLACEMENT_ACTIONS](col: string, data: any, extra: any) {
      return (
        <Tooltip title="Xem chi tiết">
          <IconButton size="small" onClick={() => extra?.gotoView && extra?.gotoView(data)} color="primary">
            <Visibility fontSize="small" />
          </IconButton>
        </Tooltip>
      );
    },
  };
};
