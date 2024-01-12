import { useState } from 'react';

import { Button, IconButton, Stack, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import WritePage from '../Write';
import { Refresh, West } from '@mui/icons-material';
import { queryKeys } from '@base/config/queryKeys';
import { useNavigate } from 'react-router';
import { useRequestEditMutation } from 'src/hooks/requestEdit/useRequestEditMutation';
import { SET_TIMEOUT } from '@base/config/constants';

interface ToolbarProps {
  data: any;
}

const Toolbar = (props: ToolbarProps) => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const navigate = useNavigate();

  const { data } = props;
  // console.log('🚀 ~ Toolbar ~ data:', data);

  // state
  const [open, setOpen] = useState<boolean>(false);
  const { mPlacementApprove, mPlacementDeny, mAdApprove, mAdDeny } = useRequestEditMutation();

  const border = `1px solid ${theme.palette.divider}`;

  const handleBack = () => {
    navigate(-1);
  };

  const handleApprove = () => {
    const params = {
      id: data?.id,
    };
    if (data?.type === 'placement') {
      mPlacementApprove.mutate(params, {
        onSuccess(data, variables, context) {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.requestEdits]);
          }, SET_TIMEOUT);
          navigate(-1);
        },
      });
    } else if (data?.type === 'advertisement') {
      mAdApprove.mutate(params, {
        onSuccess(data, variables, context) {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.requestEdits]);
          }, SET_TIMEOUT);
          navigate(-1);
        },
      });
    }
  };

  const handleDeny = () => {
    const params = {
      id: data?.id,
    };
    if (data?.type === 'placement') {
      mPlacementDeny.mutate(params, {
        onSuccess(data, variables, context) {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.requestEdits]);
          }, SET_TIMEOUT);
          navigate(-1);
        },
      });
    } else if (data?.type === 'advertisement') {
      mAdDeny.mutate(params, {
        onSuccess(data, variables, context) {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.requestEdits]);
          }, SET_TIMEOUT);
          navigate(-1);
        },
      });
    }
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1 }}>
        <Stack>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            startIcon={<West fontSize="small" />}
            onClick={handleBack}
          >
            Trở về
          </Button>
        </Stack>
        <Stack direction="row">
          <Button variant="outlined" size="small" color="primary" onClick={handleApprove} sx={{ marginRight: 2 }}>
            Chấp nhận
          </Button>
          <Button variant="outlined" size="small" color="primary" onClick={handleDeny}>
            Từ chối
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Toolbar;
