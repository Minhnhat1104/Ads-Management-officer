import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from '@goongmaps/goong-map-react';
import { DiaDiem, dummyData } from './dummyData';
import Pins from './Pins';
import AdInfo from './AdInfo';
import ControlPanel from './ControlPanel';

const GOONG_MAPTILES_KEY = '15pyrTUaBGMXx0b9LxJpuSUPOkWVmLyDueIcbgrW'; // Set your goong maptiles key here

const Home = () => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 10.7631,
    longitude: 106.68246,
    zoom: 16,
  });
  const [popupInfo, setPopupInfo] = useState<DiaDiem | null>(null);

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      goongApiAccessToken={GOONG_MAPTILES_KEY}
    >
      <Pins data={dummyData} onClick={setPopupInfo} />

      {popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={setPopupInfo}
        >
          <AdInfo info={popupInfo} />
        </Popup>
      )}

      <ControlPanel />
    </ReactMapGL>
  );
};

export default Home;
