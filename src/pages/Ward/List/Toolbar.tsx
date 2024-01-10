import { useState } from 'react';

import { Button, IconButton, InputLabel, MenuItem, Select, Stack, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import WritePage from '../Write';
import { Refresh } from '@mui/icons-material';
import { queryKeys } from '@base/config/queryKeys';
import { FieldsData } from '@base/components/ReactTable8/Helper';
import SelectBox from '@base/components/SelectBox';
import { LabelValue } from '@base/types';

interface ToolbarProps {}

const Toolbar = (props: ToolbarProps) => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const border = `1px solid ${theme.palette.divider}`;

  const handleRefresh = () => {
    queryClient.invalidateQueries([queryKeys.wards]);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ py: 1 }}>
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
