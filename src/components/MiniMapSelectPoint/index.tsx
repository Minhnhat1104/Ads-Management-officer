import { useEffect, useState } from 'react';
import ReactMapGL, { MapEvent, Marker } from '@goongmaps/goong-map-react';
import { GOONG_MAPTILES_KEY } from 'src/constants/goongmap';
import { Avatar, Typography, useTheme } from '@mui/material';

const geolocateControlStyle = {
  right: 10,
  top: 10,
};

interface MiniMapSelectPointProps {
  value: any;
  onChange: any;
}

const MiniMapSelectPoint = (props: MiniMapSelectPointProps) => {
  const { value, onChange } = props;
  const theme = useTheme();
  // MAP
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 10.7631,
    longitude: 106.68246,
    zoom: 16,
  });

  const handleClick = (e: MapEvent) => {
    const [longitude, latitude] = e.lngLat;
    onChange &&
      onChange({
        lat: latitude,
        lng: longitude,
      });
  };

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      goongApiAccessToken={GOONG_MAPTILES_KEY}
      touchRotate={true}
      transitionDuration={100}
      height={500}
      onClick={handleClick}
    >
      <Marker longitude={parseFloat(value?.lng)} latitude={parseFloat(value?.lat)}>
        <div>
          <Avatar
            // onClick={() => onClick(city)}
            alt="QC"
            sx={{
              width: 24,
              height: 24,
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Typography fontSize={12}>QC</Typography>
          </Avatar>
        </div>
      </Marker>
    </ReactMapGL>
  );
};

export default MiniMapSelectPoint;
