import CheckBoxGroup from '@base/components/CheckBoxGroup';
import { LabelValue } from '@base/types';
import { Box, Stack, useTheme } from '@mui/material';
import React, { useState } from 'react';

const MAP_FILTER_OPTIONS: LabelValue[] = [
  {
    label: 'Bảng QC',
    value: 'QC',
  },
  {
    label: 'Báo cáo vi phạm',
    value: 'InvalidQC',
  },
];

const ControlPanel = () => {
  const theme = useTheme();
  const [filter, setFilter] = useState<LabelValue[]>([]);
  return (
    <Box
      className="control-panel"
      sx={{ background: 'rgba(255, 255, 255, 0.8)', float: 'right', width: 300, p: 2, m: 2, borderRadius: 1 }}
    >
      <CheckBoxGroup options={MAP_FILTER_OPTIONS} value={filter} onChange={setFilter} />
    </Box>
  );
};

export default ControlPanel;
