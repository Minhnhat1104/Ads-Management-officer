import * as React from 'react';
import { Marker } from '@goongmaps/goong-map-react';
import { Avatar, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAdvertisements } from 'src/hooks/useAdvertisements';

interface PinItemProps {
  city: any;
  setBoardData: React.Dispatch<any>;
  setPopupInfo: React.Dispatch<any>;
}

const PinItem = (props: PinItemProps) => {
  const { city, setBoardData, setPopupInfo } = props;
  const theme = useTheme();

  const handleClick = () => {
    setBoardData({
      ...city,
      lng: parseFloat(city.lng),
      lat: parseFloat(city.lat),
    });
  };

  return (
    <Marker longitude={parseFloat(city.lng)} latitude={parseFloat(city.lat)}>
      <div onMouseEnter={() => setPopupInfo(city)} onMouseLeave={() => setPopupInfo(null)} onClick={handleClick}>
        <Avatar
          // onClick={() => onClick(city)}
          alt="QC"
          sx={{ width: 24, height: 24, bgcolor: theme.palette.error.main }}
        >
          <Typography fontSize={12}>RP</Typography>
        </Avatar>
      </div>
    </Marker>
  );
};

export default PinItem;
