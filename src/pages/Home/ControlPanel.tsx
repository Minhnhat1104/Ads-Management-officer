import CheckBoxGroup from '@base/components/CheckBoxGroup';
import { LabelValue } from '@base/types';
import { Box, Divider, InputLabel, Stack, TextField, Typography, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { GOONG_API_KEY } from 'src/constants/goongmap';
import Checkbox from '@base/components/CheckBox';
import _ from 'lodash';

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

interface ControlPanelProps {
  showPins: any;
  setShowPins: any;
  setViewport: any;
  showReports: any;
  setShowReports: any;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { showPins, setShowPins, setViewport, showReports, setShowReports } = props;
  const theme = useTheme();
  const [filter, setFilter] = useState<LabelValue[]>([]);
  const [search, setSearch] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchValue(searchText), 500)).current;

  const [ans, setAns] = useState<LocationResult[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (search !== '') {
      const getCoordinates = async (searchValue: string, apiKey = GOONG_API_KEY) => {
        const encodedLocationName = encodeURIComponent(searchValue.trim());

        const url = `https://rsapi.goong.io/geocode?address=${encodeURIComponent(
          encodedLocationName
        )}&api_key=${apiKey}`;

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

      getCoordinates(searchValue);
    } else {
      setAns([]);
    }
  }, [searchValue]);

  return (
    <Stack
      className="control-panel"
      sx={{ background: 'rgba(255, 255, 255, 1)', float: 'left', width: 300, p: 2, m: 2, borderRadius: 1, zIndex: 999 }}
    >
      {/* <CheckBoxGroup options={MAP_FILTER_OPTIONS} value={filter} onChange={setFilter} /> */}
      <Checkbox label={'Bảng QC'} value={showPins} onChange={setShowPins} />
      <Checkbox label={'Báo cáo vi phạm'} value={showReports} onChange={setShowReports} />

      <InputLabel sx={{ mt: 1 }}>Tìm địa chỉ</InputLabel>
      <TextField
        variant="outlined"
        value={search}
        autoComplete="off"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(event.target.value);
          setSearchTextDebounced(event.target.value);
        }}
      />

      {ans && (
        <Stack width="100%" maxHeight={200} sx={{ overflowY: 'scroll' }} divider={<Divider />} mt={1}>
          {ans?.map((_item: LocationResult, i: number) => {
            // Extracting the first long_name
            const firstLongName = _item.address_components[0].long_name;

            // Creating an array of all long_names
            const detailAddress = _item.address_components.map((address_component: AddressComponent) => {
              return address_component.long_name;
            });

            const concatenatedNames = detailAddress.join(', ');

            return (
              <Stack
                key={i}
                p={1}
                onClick={() => {
                  setViewport({
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
                <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{firstLongName}</Typography>
                <Typography fontSize={14}>{concatenatedNames}</Typography>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
};

export default ControlPanel;
