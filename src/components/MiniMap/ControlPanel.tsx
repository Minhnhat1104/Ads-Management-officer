import CheckBoxGroup from '@base/components/CheckBoxGroup';
import { LabelValue } from '@base/types';
import { Box, Stack, TextField, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GOONG_API_KEY } from 'src/constants/goongmap';

interface Location {
  lat: number;
  lng: number;
}

interface Geometry {
  location: Location;
  boundary?: any;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
}

interface LocationResult {
  geometry: Geometry;
  address_components: AddressComponent[];
  formatted_address: string;
  lat_location: number;
  long_location: number;
}

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

// getCoordinates();

const ControlPanel = (prop: any) => {
  const theme = useTheme();
  const [filter, setFilter] = useState<LabelValue[]>([]);
  const [search, setSearch] = useState<string>('');
  const [ans, setAns] = useState<LocationResult[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const selectedAds = prop.selectedPin;

  const [viewport, setViewport] = React.useState({
    ...prop.viewport,
  });

  return (
    <Stack
      className="control-panel"
      sx={{ background: 'rgba(255, 255, 255, 1)', float: 'left', width: 300, p: 2, m: 2, borderRadius: 1, zIndex: 999 }}
    >
      {selectedAds !== null && (
        <Stack>
          <Typography fontSize={16}>{selectedAds?.ward + ', ' + selectedAds?.district}</Typography>
          <Typography fontSize={16}>{selectedAds?.locationType}</Typography>
          <Typography fontSize={16}>{selectedAds?.format}</Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default ControlPanel;
