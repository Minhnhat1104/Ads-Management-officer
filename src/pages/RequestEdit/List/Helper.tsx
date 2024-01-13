import { Box, Button, Chip, IconButton, Stack, Theme, Tooltip, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import * as keyNames from './keyNames';
import { CheckCircle, ClearOutlined, DoneOutlined, Visibility } from '@mui/icons-material';
import WritePage from '../Write';
import { useState } from 'react';
import dayjs from 'dayjs';
import { LabelValue } from '@base/types';
import { REPORT_STATUS_OPTIONS, REQUEST_EDIT_TYPE_OPTIONS, REQUEST_STATUS_OPTIONS } from 'src/constants';

export const getMapColumns = () => {
  // const [open, setOpen] = useState<boolean>(false);

  return {
    [keyNames.KEY_NAME_REQUEST_CREATED_AT](col: string, data: any) {
      return <Typography>{dayjs(data?.[col]).format('DD/MM/YYYY HH:mm') || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_STATUS](col: string, data: any) {
      const option =
        REQUEST_STATUS_OPTIONS.find((_option: LabelValue<string, number>) => _option?.value === data?.[col]) || null;
      return <Chip label={option?.label || ''} size="small" color={option?.extra || 'secondary'} />;
    },
    [keyNames.KEY_NAME_REQUEST_TYPE](col: string, data: any) {
      return (
        <Typography>
          {REQUEST_EDIT_TYPE_OPTIONS.find((_option: LabelValue) => _option.value === data?.[col])?.label}
        </Typography>
      );
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
    // [keyNames.KEY_NAME_REQUEST_ACTIONS](col: string, data: any, extra: any) {
    //   return (
    //     data?.status === 0 && (
    //       <Stack direction="row" spacing={1}>
    //         <Tooltip title="Chấp nhận" placement="top">
    //           <IconButton
    //             size="small"
    //             onClick={() => extra?.handleApprove && extra?.handleApprove(data)}
    //             color="success"
    //           >
    //             <DoneOutlined fontSize="small" />
    //           </IconButton>
    //         </Tooltip>

    //         <Tooltip title="Từ chối" placement="top">
    //           <IconButton size="small" onClick={() => extra?.handleDeny && extra?.handleDeny(data)} color="error">
    //             <ClearOutlined fontSize="small" />
    //           </IconButton>
    //         </Tooltip>
    //       </Stack>
    //     )
    //   );
    // },
    [keyNames.KEY_NAME_REQUEST_ACTIONS](col: string, data: any, extra: any) {
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
