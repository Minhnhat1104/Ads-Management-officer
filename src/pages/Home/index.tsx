import React, { useEffect, useState } from 'react';
import ReactMapGL, { GeolocateControl, FullscreenControl, Marker, Popup } from '@goongmaps/goong-map-react';
import { DiaDiem, dummyData } from './dummyData';
import Pins from './Pins';
import AdInfo from './AdInfo';
import ControlPanel from './ControlPanel';

import BoardList from './BoardList';


const GOONG_MAPTILES_KEY = '15pyrTUaBGMXx0b9LxJpuSUPOkWVmLyDueIcbgrW'; // Set your goong maptiles key here

const fullscreenControlStyle = {
  right: 10,
  top: 10,
};

const geolocateControlStyle = {
  right: 10,
  top: 10,
};

const Home = () => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 10.7631,
    longitude: 106.68246,
    zoom: 16,
  });

  const [popupInfo, setPopupInfo] = useState<DiaDiem | null>(null);
  const [boardData, setBoardData] = useState<{
    longitude: number;
    latitude: number;
    data: any[];
  } | null>(null);

  useEffect(() => {
    // Get user's location using browser's Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Set the initial viewport state with user location
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude,
          longitude,
          zoom: 12, // set the zoom level as needed
        }));
        console.log(latitude, longitude);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []); // em

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      goongApiAccessToken={GOONG_MAPTILES_KEY}
      touchRotate={true}
      transitionDuration={100}
    >
      <Pins data={dummyData} setPopupInfo={setPopupInfo} setBoardData={setBoardData} />

      {popupInfo && boardData === null && (
        <Popup
          tipSize={5}
          offsetLeft={12}
          anchor="bottom"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          capturePointerMove
        >
          <AdInfo info={popupInfo} />
        </Popup>
      )}

      {boardData && (
        <Popup
          tipSize={5}
          offsetLeft={12}
          anchor="bottom"
          longitude={boardData.longitude}
          latitude={boardData.latitude}
          captureScroll // Stop propagation of mouse wheel event to the map component
        >
          <BoardList data={boardData.data} setBoardData={setBoardData} />
        </Popup>
      )}

      <ControlPanel />

      {/* Current location user */}
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
      />

      {/* full screen */}
      <FullscreenControl style={fullscreenControlStyle} />
    </ReactMapGL>
  );
};

export default Home;
