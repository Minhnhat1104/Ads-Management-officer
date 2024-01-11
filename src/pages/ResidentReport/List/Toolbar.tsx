import { useState } from 'react';

import { Button, Grid, IconButton, Stack, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import WritePage from '../Write';
import { Refresh } from '@mui/icons-material';
import { queryKeys } from '@base/config/queryKeys';
import WardSelect from 'src/components/WardSelect';
import { USER_ROLE_DEPARTMENT } from 'src/constants';
import { profileAtom } from '@base/store/atoms/profileAtom';
import { useRecoilValue } from 'recoil';

interface ToolbarProps {
  ward: any;
  setward: any;
}

const Toolbar = (props: ToolbarProps) => {
  const { ward, setward } = props;
  const queryClient = useQueryClient();
  const profile = useRecoilValue(profileAtom);
  const theme = useTheme();

  const border = `1px solid ${theme.palette.divider}`;

  const handleRefresh = () => {
    queryClient.invalidateQueries([queryKeys.reports]);
  };
  return (
    <>
      <Grid container sx={{ py: 1 }}>
        <Grid item xs={6}>
          {profile?.roleName === USER_ROLE_DEPARTMENT && <WardSelect value={ward} onChange={setward} />}
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <IconButton onClick={handleRefresh} sx={{ border }}>
            <Refresh fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default Toolbar;
