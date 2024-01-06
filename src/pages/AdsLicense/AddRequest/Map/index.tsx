import { useEffect, useState } from 'react';
import { usePlacements } from 'src/hooks/usePlacements';
import ReactMapGL, { GeolocateControl, FullscreenControl, Popup } from '@goongmaps/goong-map-react';
import { GOONG_MAPTILES_KEY } from 'src/constants/goongmap';
import Pins from './Pins';
import AdInfo from '@pages/Home/AdInfo';
import ControlPanel from './ControlPanel';

const geolocateControlStyle = {
  right: 10,
  top: 10,
};

const MiniMap = () => {
  // MAP
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: -74.1,
    longitude: 106.68246,
    zoom: 16,
  });
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [boardData, setBoardData] = useState<any>(null);
  const [locationAds, setLocationAds] = useState<any[]>([]);
  const [selectedPin, setSelectedPin] = useState(null);

  const { data } = usePlacements();

  const handleViewportChange = (updatedViewport: any) => {
    // Xử lý dữ liệu truyền về từ Component B
    setViewport(updatedViewport);
  };

  const handleSetSelectedPin = (selectedPin: any) => {
    setSelectedPin(selectedPin);
    console.log('selectedPin:', selectedPin);
  };

  useEffect(() => {
    if (data) {
      setLocationAds(data);
    } else {
      setLocationAds([]);
    }
  }, [data]);

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
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      goongApiAccessToken={GOONG_MAPTILES_KEY}
      touchRotate={true}
      transitionDuration={100}
    >
      <ControlPanel viewport={viewport} onViewportChange={handleViewportChange} selectedPin={selectedPin} />

      {locationAds && (
        <Pins
          data={locationAds}
          setPopupInfo={setPopupInfo}
          setBoardData={setBoardData}
          onSelectedItem={handleSetSelectedPin}
        />
      )}

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

      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
      />
    </ReactMapGL>
  );
};

export default MiniMap;
