import { Box, Button, Chip, IconButton, Stack, Theme, Tooltip, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import * as keyNames from './keyNames';
import { Visibility } from '@mui/icons-material';
import dayjs from 'dayjs';
import { REQUEST_STATUS_OPTIONS } from 'src/constants';
import { LabelValue } from '@base/types';

export const getMapColumns = () => {
  // const [open, setOpen] = useState<boolean>(false);

  return {
    [keyNames.KEY_NAME_REQUEST_STATUS](col: string, data: any) {
      return (
        <Chip
          label={
            REQUEST_STATUS_OPTIONS.find((_option: LabelValue<string, number>) => _option?.value === data?.[col])
              ?.label || ''
          }
          size="small"
        />
      );
    },
    [keyNames.KEY_NAME_REQUEST_CREATEDAT](col: string, data: any) {
      return <Typography>{data?.[col] ? dayjs(data?.[col]).format('DD/MM/YYYY HH:mm') : ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_COMPANY](col: string, data: any) {
      return <Typography>{data?.company?.name || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_REQUESTER](col: string, data: any) {
      return <Typography>{data?.requester?.lastName + ' ' + data?.requester?.firstName || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_REQUEST_EMAIL](col: string, data: any) {
      return <Typography>{data?.requester?.email || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_APPROVER](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },

    // [keyNames.KEY_NAME_REPORT_ACTIONS](col: string, data: any, extra: any) {
    //   return (
    //     <Tooltip title="Xem chi tiết" placement="top">
    //       <IconButton size="small" onClick={() => extra?.gotoView && extra?.gotoView(data)} color="primary">
    //         <Visibility fontSize="small" />
    //       </IconButton>
    //     </Tooltip>
    //   );
    // },
  };
};
