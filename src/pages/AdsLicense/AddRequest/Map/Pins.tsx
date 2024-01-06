import * as React from 'react';
import { Marker } from '@goongmaps/goong-map-react';
import { Avatar, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PinItem from './PinItem';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
interface PinProps {
  data: any[];
  setPopupInfo: React.Dispatch<any>;
  setBoardData: React.Dispatch<any>;
  onSelectedItem: (pinData: any) => void;
}

function Pins(props: PinProps) {
  const { data, setPopupInfo, setBoardData, onSelectedItem } = props;
  const theme = useTheme();

  const [selectedPin, setSelectedPin] = useState(null);

  const handlePinItemClick = (pinData: any) => {
    setSelectedPin(pinData);
    onSelectedItem(pinData);
  };

  return (
    <>
      {data.map((city, index) => (
        <PinItem
          key={`marker-${index}`}
          city={city}
          setBoardData={setBoardData}
          setPopupInfo={setPopupInfo}
          onPinItemClick={handlePinItemClick}
          isSelected={selectedPin === city}
        />
      ))}
    </>
  );
}

export default React.memo(Pins);
