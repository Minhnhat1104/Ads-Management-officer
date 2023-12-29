import { Box, Button, IconButton, Stack, Theme, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import * as keyNames from './keyNames';
import { CheckCircle } from '@mui/icons-material';
import WritePage from '../Write';
import { useState } from 'react';

export const getMapColumns = () => {
  // const [open, setOpen] = useState<boolean>(false);

  return {
    [keyNames.KEY_NAME_REPORT_DISTRICT](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_WARD](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_PHONENUMBER](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_EMAIL](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_FIRSTNAME](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_ADS_TYPE](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_ISPROCESSING](col: string, data: any) {
      return (
        <>
          {data?.[col] ? (
            <CheckCircle fontSize="small" color="success" />
          ) : (
            <CancelIcon fontSize="small" color="error" />
          )}
        </>
      );
    },
    ['Detail'](col: string, data: any) {
      return (
        <>
          <Button
            onClick={() => {
              // setOpen(true);
              console.log('Detail clicked');
            }}
          >
            Xem chi tiết
          </Button>
          {/* {open && <WritePage isOpen={open} onClose={() => setOpen(false)} />} */}
        </>
      );
    },
  };
};
