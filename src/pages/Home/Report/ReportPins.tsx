import * as React from 'react';
import { Marker } from '@goongmaps/goong-map-react';
import { Avatar, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import PinItem from './PinItem';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
interface PinProps {
  data: any[];
  setPopupInfo: React.Dispatch<any>;
  setBoardData: React.Dispatch<any>;
}

function ReportPins(props: PinProps) {
  const { data, setPopupInfo, setBoardData } = props;
  const theme = useTheme();

  return (
    <>
      {data.map((city, index) => (
        <PinItem key={`marker-${index}`} city={city} setBoardData={setBoardData} setPopupInfo={setPopupInfo} />
      ))}
    </>
  );
}

export default React.memo(ReportPins);
