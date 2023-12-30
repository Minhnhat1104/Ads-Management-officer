import React, { useEffect, useState } from 'react';
import ReactMapGL, {
  GeolocateControl,
  FullscreenControl,
  Marker,
  Popup,
  FlyToInterpolator,
} from '@goongmaps/goong-map-react';
import { DiaDiem, dummyData } from './dummyData';
import Pins from './Pins';
import AdInfo from './AdInfo';
import ControlPanel from './ControlPanel';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import BoardList from './BoardList';
import axios from 'axios';
import { axiosApi } from '@base/utils/axios/api';

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
    latitude: -74.1,
    longitude: 106.68246,
    zoom: 16,
  });

  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [boardData, setBoardData] = useState<any>(null);

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

  const handleViewportChange = (updatedViewport: any) => {
    // Xử lý dữ liệu truyền về từ Component B
    setViewport(updatedViewport);
  };

  // useEffect(() => {
  //   // Thực hiện bất kỳ xử lý nào bạn cần khi viewport thay đổi
  //   // Ví dụ: Gọi API, xử lý dữ liệu, etc.
  //   console.log('Viewport changed:', viewport);
  // }, [viewport]);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };

  const [locationAds, setLocationAds] = useState<any[]>([]);
  const [advertisements, setAdvertisements] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placementsResponse = await axiosApi.get('/placements');
        setLocationAds(placementsResponse.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      goongApiAccessToken={GOONG_MAPTILES_KEY}
      touchRotate={true}
      transitionDuration={100}
    >
      {locationAds && <Pins data={locationAds} setPopupInfo={setPopupInfo} setBoardData={setBoardData} />}

      {popupInfo && boardData === null && (
        <Popup
          tipSize={5}
          offsetLeft={12}
          anchor="bottom"
          longitude={parseFloat(popupInfo.lng)}
          latitude={parseFloat(popupInfo.lat)}
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
          longitude={boardData.lng}
          latitude={boardData.lat}
          captureScroll // Stop propagation of mouse wheel event to the map component
        >
          <BoardList locationAds={locationAds} boardData={boardData} setBoardData={setBoardData} />
        </Popup>
      )}

      {/* <Marker longitude={viewport.longitude} latitude={viewport.latitude}>
        <LocationOnIcon />
      </Marker> */}

      <ControlPanel viewport={viewport} onViewportChange={handleViewportChange} />

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
