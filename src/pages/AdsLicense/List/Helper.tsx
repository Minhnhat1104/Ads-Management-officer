import { Box, Button, Chip, IconButton, Stack, Theme, Tooltip, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import * as keyNames from './keyNames';
import { Close, Visibility } from '@mui/icons-material';
import dayjs from 'dayjs';
import { REQUEST_STATUS_OPTIONS } from 'src/constants';
import { LabelValue } from '@base/types';

export const getMapColumns = () => {
  // const [open, setOpen] = useState<boolean>(false);

  return {
    [keyNames.KEY_NAME_REQUEST_STATUS](col: string, data: any) {
      const option =
        REQUEST_STATUS_OPTIONS.find((_option: LabelValue<string, number>) => _option?.value === data?.[col]) || null;
      return <Chip label={option?.label || ''} size="small" color={option?.extra || 'secondary'} />;
    },
    [keyNames.KEY_NAME_REQUEST_CREATEDAT](col: string, data: any) {
      return <Typography>{data?.[col] ? dayjs(data?.[col]).format('DD/MM/YYYY HH:mm') : ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_COMPANY](col: string, data: any) {
      return <Typography>{data?.company?.name || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_REQUESTER](col: string, data: any) {
      return (
        <Typography>{data?.requester ? data?.requester?.lastName + ' ' + data?.requester?.firstName : ''}</Typography>
      );
    },
    [keyNames.KEY_NAME_REQUEST_REQUEST_EMAIL](col: string, data: any) {
      return <Typography>{data?.requester?.email || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_APPROVER](col: string, data: any) {
      return (
        <Typography>{data?.approver ? data?.approver?.lastName + ' ' + data?.approver?.firstName : ''}</Typography>
      );
    },
    [keyNames.KEY_NAME_REQUEST_APPROVER_EMAIL](col: string, data: any) {
      return <Typography>{data?.approver?.email || ''}</Typography>;
    },
    [keyNames.KEY_NAME_REQUEST_ACTIONS](col: string, data: any, extra: any) {
      return (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Xem chi tiết" placement="top">
            <IconButton size="small" onClick={() => extra?.cancelRequest && extra?.gotoView(data)} color="primary">
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      );
    },
  };
};
