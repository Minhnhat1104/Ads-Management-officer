import { useState } from 'react';

import { Button, IconButton, Stack, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Add, Refresh } from '@mui/icons-material';
import { queryKeys } from '@base/config/queryKeys';
import WritePage from '../Write';
import { useNavigate } from 'react-router-dom';

interface ToolbarProps {}

const Toolbar = (props: ToolbarProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const border = `1px solid ${theme.palette.divider}`;

  const handleRefresh = () => {
    queryClient.invalidateQueries([queryKeys.requests]);
  };

  const gotoView = (data: any) => {
    navigate('/ads-license/add-request');
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1 }}>
        <Stack></Stack>
        <Stack direction="row" spacing={1}>
          <Button onClick={gotoView} size="small" variant="contained" startIcon={<Add />}>
            Test
          </Button>
          <Button onClick={() => setOpen(true)} size="small" variant="contained" startIcon={<Add />}>
            Thêm yêu cầu
          </Button>
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
