import { useState } from 'react';

import { Button, IconButton, Stack, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import WritePage from '../Write';
import { Cancel, Refresh, West } from '@mui/icons-material';
import { queryKeys } from '@base/config/queryKeys';
import { useNavigate } from 'react-router';
import { userRequestMutation } from 'src/hooks/userRequestMutation';
import { useRecoilValue } from 'recoil';
import { profileAtom } from '@base/store/atoms/profileAtom';
import { USER_ROLE_DEPARTMENT, USER_ROLE_WARD } from 'src/constants';

interface ToolbarProps {
  data: any;
}

const Toolbar = (props: ToolbarProps) => {
  const { data } = props;
  const queryClient = useQueryClient();
  const theme = useTheme();
  const navigate = useNavigate();

  // state
  const profile = useRecoilValue(profileAtom);

  const { mCancel, mAccept, mDeny } = userRequestMutation();

  const cancelRequest = (type: 'cancel' | 'accept' | 'deny') => {
    const params = {
      id: data?.id,
    };
    const mAction = type === 'cancel' ? mCancel : type === 'accept' ? mAccept : mDeny;
    mAction.mutate(params, {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries([queryKeys.requests]);
        queryClient.invalidateQueries([queryKeys.requestView]);
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
        {profile?.roleName === USER_ROLE_DEPARTMENT && data?.status === 0 && (
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="success"
              size="small"
              startIcon={<Cancel fontSize="small" />}
              onClick={() => cancelRequest('accept')}
            >
              Chấp nhận
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<Cancel fontSize="small" />}
              onClick={() => cancelRequest('deny')}
            >
              Từ chối
            </Button>
          </Stack>
        )}
        {profile?.roleName === USER_ROLE_WARD && data?.status === 0 && (
          <Stack>
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<Cancel fontSize="small" />}
              onClick={() => cancelRequest('cancel')}
            >
              Huỷ yêu cầu
            </Button>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default Toolbar;
