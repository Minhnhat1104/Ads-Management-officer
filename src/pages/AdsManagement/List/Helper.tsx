import { Box, IconButton, Stack, Theme, Typography } from '@mui/material';

import * as keyNames from './keyNames';
import { CheckCircle } from '@mui/icons-material';

export const getMapColumns = () => {
  return {
    [keyNames.KEY_NAME_HOME_ADDRESS](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_HOME_SECTION](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_HOME_TYPE](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_HOME_ADS_FORM](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_HOME_ADS_IMAGE](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_HOME_IS_ZONING](col: string, data: any) {
      return <>{data?.[col] && <CheckCircle fontSize="small" color="success" />}</>;
    },
  };
};
