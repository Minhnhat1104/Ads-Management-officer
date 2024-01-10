import { Box, Button, Chip, IconButton, Stack, Theme, Tooltip, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import * as keyNames from './keyNames';
import { CheckCircle, ClearOutlined, DeleteOutline, DoneOutlined, EditOutlined, Visibility } from '@mui/icons-material';
import WritePage from '../Write';
import { useState } from 'react';
import dayjs from 'dayjs';

export const getMapColumns = () => {
  // const [open, setOpen] = useState<boolean>(false);

  return {
    [keyNames.KEY_NAME_ACCOUNT_FIRST_NAME](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_ACCOUNT_LAST_NAME](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_ACCOUNT_EMAIL](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_ACCOUNT_CREATED_AT](col: string, data: any) {
      return <Typography>{dayjs(data?.[col]).format('DD/MM/YYYY HH:mm') || ''}</Typography>;
    },
    [keyNames.KEY_NAME_ACCOUNT_UPDATED_AT](col: string, data: any) {
      return <Typography>{dayjs(data?.[col]).format('DD/MM/YYYY HH:mm') || ''}</Typography>;
    },
    [keyNames.KEY_NAME_ACCOUNT_ROLE_NAME](col: string, data: any) {
      return <Typography>{[data?.approver?.lastName, data?.approver?.firstName].join(' ')}</Typography>;
    },
    [keyNames.KEY_NAME_ACCOUNT_WARD](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_ACCOUNT_DISTRICT](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_ACCOUNT_ACTIONS](col: string, data: any, extra: any) {
      return (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Phân công quản lý" placement="top">
            <IconButton size="small" onClick={() => extra?.handleApprove && extra?.handleApprove(data)} color="success">
              <EditOutlined fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Xóa tài khoản" placement="top">
            <IconButton size="small" onClick={() => extra?.handleDelete && extra?.handleDelete(data)} color="error">
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      );
    },
  };
};
