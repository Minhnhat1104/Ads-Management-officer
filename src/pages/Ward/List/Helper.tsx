import { Box, Button, IconButton, Stack, Theme, Tooltip, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import * as keyNames from './keyNames';
import { DeleteOutline, EditOutlined, Visibility } from '@mui/icons-material';
import dayjs from 'dayjs';

export const getMapColumns = () => {
  return {
    [keyNames.KEY_NAME_WARD_NAME](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    // [keyNames.KEY_NAME_WARD_DISTRICT_ID](col: string, data: any) {
    //   return <Typography>{data?.[col] || ''}</Typography>;
    // },
    [keyNames.KEY_NAME_WARD_CREATED_AT](col: string, data: any) {
      return <Typography>{data?.[col] ? dayjs(data?.[col]).format('DD/MM/YYYY HH:mm') : ''}</Typography>;
    },
    [keyNames.KEY_NAME_WARD_UPDATED_AT](col: string, data: any) {
      return <Typography>{data?.[col] ? dayjs(data?.[col]).format('DD/MM/YYYY HH:mm') : ''}</Typography>;
    },
    [keyNames.KEY_NAME_WARD_DISTRICT](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_WARD_ACTIONS](col: string, data: any, extra: any) {
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
