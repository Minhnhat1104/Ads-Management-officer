import { useState } from 'react';

import { Button, IconButton, Stack, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import WritePage from '../Write';
import { Cancel, Refresh, West } from '@mui/icons-material';
import { queryKeys } from '@base/config/queryKeys';
import { useNavigate } from 'react-router';
import { userRequestMutation } from 'src/hooks/userRequestMutation';

interface ToolbarProps {
  data: any;
}

const Toolbar = (props: ToolbarProps) => {
  const { data } = props;
  const queryClient = useQueryClient();
  const theme = useTheme();
  const navigate = useNavigate();

  // state
  const [open, setOpen] = useState<boolean>(false);

  const border = `1px solid ${theme.palette.divider}`;

  const handleRefresh = () => {
    // queryClient.invalidateQueries([queryKeys.advertisements]);
  };

  const { mCancel } = userRequestMutation();

  const cancelRequest = () => {
    const params = {
      id: data?.id,
    };
    mCancel.mutate(params, {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries([queryKeys.requests]);
        navigate(-1);
      },
    });
  };

  const handleBack = () => {
    navigate(-1);
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
        <Stack>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<Cancel fontSize="small" />}
            onClick={cancelRequest}
          >
            Huỷ yêu cầu
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Toolbar;
