import { useState } from 'react';

import { Button, IconButton, InputLabel, MenuItem, Select, Stack, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import WritePage from '../Write';
import { Refresh } from '@mui/icons-material';
import { queryKeys } from '@base/config/queryKeys';
import { FieldsData } from '@base/components/ReactTable8/Helper';
import SelectBox from '@base/components/SelectBox';
import { LabelValue } from '@base/types';

interface ToolbarProps {
  fields: any[];
  items: any[];
  onHandleFilter: any;
}

const Toolbar = (props: ToolbarProps) => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const [filter, setFilter] = useState<LabelValue | undefined>(undefined);
  const [valueFilter, setValueFilter] = useState<LabelValue | undefined>(undefined);
  const [optionsForValueFilter, setOptionsForValueFilter] = useState<LabelValue[]>([]);

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
            <SelectBox
              value={filter}
              placeholder="Click to select..."
              onChange={(selectedOption) => {
                console.log(selectedOption);
                setFilter((prevFilter) => {
                  const newFilter = { label: selectedOption.label, value: selectedOption.value };
                  const filterValue = newFilter ? newFilter.value : '';
                  setOptionsForValueFilter(props.items.map((v) => ({ label: v[filterValue], value: v[filterValue] })));
                  return newFilter;
                });
              }}
              options={props.fields.map((v) => ({ label: v.languageKey, value: v.keyName }))}
            ></SelectBox>
          </Stack>
          <Stack>
            <InputLabel id="demo-simple-select-label">Value</InputLabel>
            <SelectBox
              value={valueFilter}
              placeholder="Click to select..."
              onChange={(selectedOption) => {
                setValueFilter({ label: selectedOption.label, value: selectedOption.value });
              }}
              options={optionsForValueFilter}
            ></SelectBox>
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
