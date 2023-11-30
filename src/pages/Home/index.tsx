import React, { useState } from 'react';
import ReactMapGL from '@goongmaps/goong-map-react';

const GOONG_MAPTILES_KEY = '15pyrTUaBGMXx0b9LxJpuSUPOkWVmLyDueIcbgrW'; // Set your goong maptiles key here

const Home = () => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 10.7631,
    longitude: 106.68246,
    zoom: 16,
  });

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      goongApiAccessToken={GOONG_MAPTILES_KEY}
    />
  );
};

export default Home;
