import { Box, Button, IconButton, Stack, Theme, Tooltip, Typography } from '@mui/material';

import * as keyNames from './keyNames';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

export const getMapColumns = () => {
  return {
    [keyNames.KEY_NAME_PLACEMENT_LOCATION_TYPE_NAME](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_PLACEMENT_LOCATION_TYPE_ACTIONS](col: string, data: any, extra: any) {
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
