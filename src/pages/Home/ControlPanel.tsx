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

  // const goToNYC = (lat: number, lng: number) => {
  //   setViewport({
  //     ...viewport,
  //     longitude: lng,
  //     latitude: lat,
  //     zoom: 16,
  //     transitionDuration: 3000,
  //     // transitionInterpolator: new FlyToInterpolator(),
  //   });
  //   prop.onViewportChange(viewport);
  // };

  const getCoordinates = async (locationName: string, apiKey = GOONG_API_KEY) => {
    const encodedLocationName = encodeURIComponent(locationName.trim());

    const url = `https://rsapi.goong.io/geocode?address=${encodeURIComponent(encodedLocationName)}&api_key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const { data } = response;
      if (data && data.results && data.results.length > 0) {
        console.log(data.results);
        setAns(data.results);
      } else {
        setAns([]); // Clear the results in case there were previous results
      }
    } catch (error) {
      throw new Error('Error: ' + JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (search !== '') {
      getCoordinates(search);
    } else {
      setAns([]);
    }
  }, [search]);

  return (
    <Stack
      className="control-panel"
      sx={{ background: 'rgba(255, 255, 255, 0.9)', float: 'right', width: 300, p: 2, m: 2, borderRadius: 1 }}
    >
      <CheckBoxGroup options={MAP_FILTER_OPTIONS} value={filter} onChange={setFilter} />

      <TextField
        id="outlined-basic"
        label="Tìm địa chỉ"
        variant="outlined"
        margin="normal"
        value={search}
        autoComplete="nope"
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
                  // console.log('Trước khi setViewport:', viewport);
                  // setViewport({
                  //   ...viewport,
                  //   longitude: _item.geometry.location.lng,
                  //   latitude: _item.geometry.location.lat,
                  //   zoom: 16,
                  //   transitionDuration: 3000,
                  // });
                  // console.log('ControPanel', i);
                  // console.log('Sau khi setViewport:', viewport);
                  prop.onViewportChange({
                    width: '100%',
                    height: '100%',
                    latitude: _item.geometry.location.lat,
                    longitude: _item.geometry.location.lng,
                    zoom: 16,
                  });

                  // goToNYC(_item.geometry.location.lat, _item.geometry.location.lng);
                  // console.log('View: ', _item.geometry.location.lat, _item.geometry.location.lng);
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
