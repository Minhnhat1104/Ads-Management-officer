import * as React from 'react';
import { Marker } from '@goongmaps/goong-map-react';
import { Avatar, Typography, useTheme } from '@mui/material';
import axios from 'axios';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
interface PinProps {
  data: any[];
  setPopupInfo: React.Dispatch<any>;
  setBoardData: React.Dispatch<any>;
}

function Pins(props: PinProps) {
  const { data, setPopupInfo, setBoardData } = props;
  const theme = useTheme();

  const handleButtonClick = async (city: any, lng: any, lat: any) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };

    try {
      // Make the API call using axios
      const response = await axios.get(`http://localhost:4000/advertisement/placement/${city.id}`, { headers });

      // Assuming response.data contains the data you want to update
      setBoardData({
        lng,
        lat,
        data: response.data,
      });

      console.log('BOARD: ', lng, lat, response.data);

      // console.log('API Response:', response.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  return (
    <>
      {data.map((city, index) => (
        <Marker key={`marker-${index}`} longitude={parseFloat(city.lng)} latitude={parseFloat(city.lat)}>
          <div
            onMouseEnter={() => setPopupInfo(city)}
            onMouseLeave={() => setPopupInfo(null)}
            onClick={() => handleButtonClick(city, parseFloat(city.lng), parseFloat(city.lat))}
          >
            <Avatar
              // onClick={() => onClick(city)}
              alt="QC"
              sx={{ width: 24, height: 24, bgcolor: theme.palette.primary.main }}
            >
              <Typography fontSize={12}>QC</Typography>
            </Avatar>
          </div>
        </Marker>
      ))}
    </>
  );
}

export default React.memo(Pins);
