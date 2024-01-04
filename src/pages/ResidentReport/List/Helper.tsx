import { Box, Button, Chip, IconButton, Stack, Theme, Tooltip, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import * as keyNames from './keyNames';
import { CheckCircle, Visibility } from '@mui/icons-material';
import WritePage from '../Write';
import { useState } from 'react';

export const getMapColumns = () => {
  // const [open, setOpen] = useState<boolean>(false);

  return {
    [keyNames.KEY_NAME_REPORT_WARD](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_DISTRICT](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_FIRST_NAME](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_LAST_NAME](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_EMAIL](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_PHONE](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_STATE](col: string, data: any) {
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
    [keyNames.KEY_NAME_REPORT_TYPE](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_ACTIONS](col: string, data: any, extra: any) {
      return (
        <Tooltip title="Xem chi tiết" placement="top">
          <IconButton size="small" onClick={() => extra?.gotoView && extra?.gotoView(data)} color="primary">
            <Visibility fontSize="small" />
          </IconButton>
        </Tooltip>
      );
    },
  };
};
