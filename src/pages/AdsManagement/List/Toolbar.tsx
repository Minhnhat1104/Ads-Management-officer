import { useState } from 'react';

import { Button, IconButton, InputLabel, MenuItem, Select, Stack, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import WritePage from '../Write';
import { Refresh } from '@mui/icons-material';
import { queryKeys } from '@base/config/queryKeys';
import { FieldsData } from '@base/components/ReactTable8/Helper';

interface ToolbarProps {
  fields: FieldsData;
  items: any[];
}

const Toolbar = (props: ToolbarProps) => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const [filter, setFilter] = useState();
  const [valueFilter, setValueFilter] = useState();

  const border = `1px solid ${theme.palette.divider}`;

  const handleRefresh = () => {
    queryClient.invalidateQueries([queryKeys.placements]);
  };
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1 }}>
        <Stack direction="row" alignItems="center" minWidth={250} justifyContent="space-between">
          <Stack>
            <InputLabel id="demo-simple-select-label">Title</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Age"
              onChange={() => setFilter(filter)}
            >
              {props.fields.map((field, index) => {
                return (
                  <MenuItem key={index} value={field.keyName}>
                    {field.languageKey}
                  </MenuItem>
                );
              })}
            </Select>
          </Stack>
          <Stack>
            <InputLabel id="demo-simple-select-label">Value</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Age"
              onChange={() => setFilter(filter)}
            >
              {props.items.map((field, index) => {
                return (
                  <MenuItem key={index} value={2}>
                    {field.filter}
                  </MenuItem>
                );
              })}
            </Select>
          </Stack>
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
