import { Box, Button, Chip, IconButton, Stack, Theme, Tooltip, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import * as keyNames from './keyNames';
import { CheckCircle, Visibility } from '@mui/icons-material';
import WritePage from '../Write';
import { useState } from 'react';
import dayjs from 'dayjs';

export const getMapColumns = () => {
  // const [open, setOpen] = useState<boolean>(false);

  return {
    [keyNames.KEY_NAME_REQUEST_CREATED_AT](col: string, data: any) {
      return <Typography>{dayjs(data?.[col]).format('DD/MM/YYYY HH:mm') || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_STATUS](col: string, data: any) {
      return (
        <>
          {data?.[col] === 1 ? (
            <Chip color="success" size="small" label="Đã xử lí" />
          ) : (
            <Chip color="warning" size="small" label="Chưa xử lí" />
          )}
        </>
      );
    },
    [keyNames.KEY_NAME_REQUEST_TYPE](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_REQUESTER](col: string, data: any) {
      return <Typography>{[data?.requester?.lastName, data?.requester?.firstName].join(' ')}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_REQUESTER_EMAIL](col: string, data: any) {
      return <Typography>{data?.requester?.email || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_APPROVER](col: string, data: any) {
      return <Typography>{[data?.approver?.lastName, data?.approver?.firstName].join(' ')}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_APPROVER_EMAIL](col: string, data: any) {
      return <Typography>{data?.approver?.email || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_ACTIONS](col: string, data: any, extra: any) {
      return (
        <Tooltip title="Xem chi tiết" placement="top">
          <IconButton
            size="small"
            // onClick={() => extra?.gotoView && extra?.gotoView(data)}
            color="primary"
          >
            <Visibility fontSize="small" />
          </IconButton>
        </Tooltip>
      );
    },
  };
};
