import * as React from 'react';
import { Marker } from '@goongmaps/goong-map-react';
import { Avatar, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAdvertisements } from 'src/hooks/useAdvertisements';
import { deepOrange } from '@mui/material/colors';

interface PinItemProps {
  city: any;
  setBoardData: React.Dispatch<any>;
  setPopupInfo: React.Dispatch<any>;
  onPinItemClick: (pinData: any) => void;
  isSelected: boolean;
}

const PinItem = (props: PinItemProps) => {
  const { city, setBoardData, setPopupInfo, onPinItemClick, isSelected } = props;
  const theme = useTheme();

  const [enabled, setEnabled] = useState<boolean>(false);

  const { data } = useAdvertisements(null, city.id, {
    enabled,
  });

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    // setIsClicked((prevIsClicked) => !prevIsClicked);
    onPinItemClick(city);
  };

  return (
    <Marker longitude={parseFloat(city.lng)} latitude={parseFloat(city.lat)}>
      <div onMouseEnter={() => setPopupInfo(city)} onMouseLeave={() => setPopupInfo(null)} onClick={handleClick}>
        <Avatar
          // onClick={() => onClick(city)}
          alt="QC"
          sx={{
            width: 24,
            height: 24,
            bgcolor: isSelected ? deepOrange[500] : theme.palette.primary.main,
          }}
        >
          <Typography fontSize={12}>QC</Typography>
        </Avatar>
      </div>
    </Marker>
  );
};

export default PinItem;
