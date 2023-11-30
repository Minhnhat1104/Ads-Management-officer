import { Dispatch, useRef, useState } from 'react';

import { Box, Button, Grid, Popover, Stack, Typography, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import WritePage from './Write';

interface ToolbarProps {}

const Toolbar = (props: ToolbarProps) => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [keyword, setKeyword] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<any>(null);

  const border = `1px solid ${theme.palette.divider}`;
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1 }}>
        <Stack></Stack>
        <Button size="small" variant="contained" sx={{ width: 'fit-content' }} onClick={() => setOpen(true)}>
          Add
        </Button>
      </Stack>

      {open && <WritePage isOpen={open} onClose={() => setOpen(false)} />}
    </>
  );
};

export default Toolbar;
