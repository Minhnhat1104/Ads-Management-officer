import * as React from 'react';
import { Marker } from '@goongmaps/goong-map-react';
import { Avatar, Typography, useTheme } from '@mui/material';
import { dummyBoardList } from './dummyData';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
interface PinProps {
  data: any[];
  setPopupInfo: React.Dispatch<any>;
  setBoardData: React.Dispatch<any>;
}

function Pins(props: PinProps) {
  const { data, setPopupInfo, setBoardData } = props;
  const theme = useTheme();

  return (
    <>
      {data.map((city, index) => (
        <Marker key={`marker-${index}`} longitude={city.longitude} latitude={city.latitude}>
          <div
            onMouseEnter={() => setPopupInfo(city)}
            onMouseLeave={() => setPopupInfo(null)}
            onClick={() =>
              setBoardData({
                longitude: city.longitude,
                latitude: city.latitude,
                data: dummyBoardList,
              })
            }
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
