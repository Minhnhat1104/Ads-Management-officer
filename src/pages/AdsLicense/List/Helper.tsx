import { Box, Chip, IconButton, Stack, Theme, Typography } from '@mui/material';

import * as keyNames from './keyNames';
import { CheckCircle } from '@mui/icons-material';
import dayjs from 'dayjs';

export const getMapColumns = () => {
  return {
    [keyNames.KEY_NAME_REQUEST_AD](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_COMPANY_NAME](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_COMPANY_EMAIL](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_COMPANY_PHONE](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_COMPANY_ADDRESS](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_COMPANY_START_DATE](col: string, data: any) {
      return <>{dayjs().format('DD/MM/YYYY')}</>;
    },
    [keyNames.KEY_NAME_REQUEST_COMPANY_END_DATE](col: string, data: any) {
      return <>{dayjs().format('DD/MM/YYYY')}</>;
    },
    [keyNames.KEY_NAME_REQUEST_COMPANY_STATUS](col: string, data: any) {
      return data?.[col] ? (
        <Chip size="small" variant="filled" color="success" label="Đã phê duyệt" />
      ) : (
        <Chip size="small" variant="filled" color="secondary" label="Đang phê duyệt" />
      );
    },
  };
};
