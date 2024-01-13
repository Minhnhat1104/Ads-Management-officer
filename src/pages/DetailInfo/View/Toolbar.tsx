import { useState } from 'react';

import { Button, IconButton, Stack, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Add, BackHand, Refresh, West } from '@mui/icons-material';
import PasswordIcon from '@mui/icons-material/Password';
import { queryKeys } from '@base/config/queryKeys';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { profileAtom } from '@base/store/atoms/profileAtom';
import { USER_ROLE_WARD } from 'src/constants';

interface ToolbarProps {}

const Toolbar = (props: ToolbarProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const profile = useRecoilValue(profileAtom);

  const border = `1px solid ${theme.palette.divider}`;

  const handleRefresh = () => {
    queryClient.invalidateQueries([queryKeys.requests]);
  };

  const gotoHome = (data?: any) => {
    navigate('/');
  };
  const gotoView = (data?: any) => {
    navigate('/change-password');
  };

  const handleBack = () => {
    gotoHome();
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1 }} marginTop={2}>
        <Stack>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            startIcon={<West fontSize="small" />}
            onClick={handleBack}
            sx={{ marginLeft: 2 }}
          >
            Trở về
          </Button>
        </Stack>
        <Stack direction="row" spacing={1} marginRight={2}>
          {profile?.roleName === USER_ROLE_WARD && (
            <Button onClick={gotoView} size="small" variant="contained" startIcon={<PasswordIcon />}>
              Đổi mật khẩu
            </Button>
          )}
        </Stack>
        {/* <Stack direction="row" spacing={1} marginRight={2}>
          <Button onClick={gotoView} size="small" variant="contained" startIcon={<PasswordIcon />}>
            Đổi mật khẩu
          </Button>
        </Stack> */}
      </Stack>
    </>
  );
};

export default Toolbar;
