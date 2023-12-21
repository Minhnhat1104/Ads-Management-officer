import { Box, IconButton, Stack, Theme, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import * as keyNames from './keyNames';
import { CheckCircle } from '@mui/icons-material';
import WritePage from '../Write';
import { useState } from 'react';

export const getMapColumns = () => {
  return {
    [keyNames.KEY_NAME_REPORT_TIMESENT](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_FULLNAME](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_PHONENUMBER](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_ADS_TABLE](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REPORT_ADDRESS](col: string, data: any) {
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
          Xem chi tiết
          {/* {open && <WritePage isOpen={open} onClose={() => setOpen(false)} />} */}
        </>
      );
    },
  };
};
