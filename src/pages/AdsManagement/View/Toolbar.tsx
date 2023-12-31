import { useState } from 'react';

import { Button, IconButton, Stack, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import WritePage from '../Write';
import { Refresh, West } from '@mui/icons-material';
import { queryKeys } from '@base/config/queryKeys';
import { useNavigate } from 'react-router';

interface ToolbarProps {
  placementId: string;
}

const Toolbar = (props: ToolbarProps) => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const navigate = useNavigate();

  // state
  const [open, setOpen] = useState<boolean>(false);

  const border = `1px solid ${theme.palette.divider}`;

  const handleRefresh = () => {
    queryClient.invalidateQueries([queryKeys.advertisements]);
  };

  const handleBack = () => {
    navigate('/ads-management');
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
        <Stack direction="row" spacing={1}>
          {/* <Button size="small" variant="contained" sx={{ width: 'fit-content' }} onClick={() => setOpen(true)}>
            Add
          </Button> */}
          <IconButton onClick={handleRefresh} sx={{ border }}>
            <Refresh fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {open && <WritePage isOpen={open} onClose={() => setOpen(false)} />}
    </>
  );
};

export default Toolbar;
