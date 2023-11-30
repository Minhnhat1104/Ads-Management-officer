import { Dispatch, useRef, useState } from 'react';

import { Box, Grid, Popover, Stack, Typography, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

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
      <Grid container sx={{ mb: 2, p: 0.25 }}>
        {/* <Grid item xs spacing={0.5} alignItems={'center'}>

        </Grid> */}
        <Grid item xs={12} display="flex" alignItems="center" justifyContent="flex-end"></Grid>
      </Grid>
    </>
  );
};

export default Toolbar;
