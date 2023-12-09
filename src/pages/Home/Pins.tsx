import * as React from 'react';
import { Marker } from '@goongmaps/goong-map-react';
import { Avatar, Typography, useTheme } from '@mui/material';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
interface PinProps {
  data: any[];
  onClick: (city: any) => void;
}

function Pins(props: PinProps) {
  const theme = useTheme();
  const { data, onClick } = props;

  return (
    <>
      {data.map((city, index) => (
        <Marker key={`marker-${index}`} longitude={city.longitude} latitude={city.latitude}>
          <Avatar
            onClick={() => onClick(city)}
            alt="QC"
            sx={{ width: 24, height: 24, bgcolor: theme.palette.primary.main }}
          >
            <Typography fontSize={12}>QC</Typography>
          </Avatar>
        </Marker>
      ))}
    </>
  );
}

export default React.memo(Pins);
