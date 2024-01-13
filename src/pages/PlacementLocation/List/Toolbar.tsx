import { useState } from 'react';

import { Button, IconButton, InputLabel, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import WritePage from '../Write';
import { Refresh } from '@mui/icons-material';
import { queryKeys } from '@base/config/queryKeys';

interface ToolbarProps {}

const Toolbar = (props: ToolbarProps) => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const border = `1px solid ${theme.palette.divider}`;

  const handleRefresh = () => {
    queryClient.invalidateQueries([queryKeys.placementLocationType]);
    queryClient.invalidateQueries([queryKeys.placements]);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1 }}>
        <Stack direction="row" spacing={1}>
          <Typography sx={{ fontSize: 18, fontWeight: 600, marginLeft: 1 }}>Quản lý các điểm đặt quảng cáo</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="contained" sx={{ width: 'fit-content' }} onClick={() => setOpen(true)}>
            Add
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
