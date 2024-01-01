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

  const [viewport, setViewport] = React.useState({
    ...prop.viewport,
  });

  return (
    <Stack
      className="control-panel"
      sx={{ background: 'rgba(255, 255, 255, 1)', float: 'left', width: 300, p: 2, m: 2, borderRadius: 1, zIndex: 999 }}
    >
      <CheckBoxGroup options={MAP_FILTER_OPTIONS} value={filter} onChange={setFilter} />

      <TextField
        id="outlined-basic"
        label="Tìm địa chỉ"
        variant="outlined"
        margin="normal"
        value={search}
        autoComplete="none"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(event.target.value);
        }}
      />

      {ans && (
        <Stack spacing={1} width={400} maxHeight={200} className="scroll-box">
          {ans?.map((_item: LocationResult, i: number) => {
            // Extracting the first long_name
            const firstLongName = _item.address_components[0].long_name;

            // Creating an array of all long_names
            const detailAddress = _item.address_components.map((address_component: AddressComponent) => {
              return address_component.long_name;
            });

            const concatenatedNames = detailAddress.join(', ');

            return (
              <div
                key={i}
                onClick={() => {
                  prop.onViewportChange({
                    width: '100%',
                    height: '100%',
                    latitude: _item.geometry.location.lat,
                    longitude: _item.geometry.location.lng,
                    zoom: 16,
                  });
                }}
                onMouseEnter={() => {
                  setHoveredIndex(i);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                }}
                style={{ backgroundColor: hoveredIndex === i ? '#f3f3f3' : 'transparent' }}
              >
                <Typography sx={{ fontSize: 20, fontWeight: 500 }}>{firstLongName}</Typography>
                <Typography fontSize={16} fontWeight={400}>
                  {concatenatedNames}
                </Typography>
              </div>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
};

export default ControlPanel;
