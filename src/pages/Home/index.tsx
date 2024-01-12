import React, { useEffect, useState } from 'react';
import ReactMapGL, { GeolocateControl, FullscreenControl, Popup } from '@goongmaps/goong-map-react';
import Pins from './Advertisement/Pins';
import AdInfo from './Advertisement/AdInfo';
import ControlPanel from './ControlPanel';

import BoardList from './Advertisement/BoardList';
import { usePlacements } from 'src/hooks/usePlacements';
import { GOONG_MAPTILES_KEY } from 'src/constants/goongmap';
import { useReports } from 'src/hooks/useReports';
import ReportPins from './Report/ReportPins';

const fullscreenControlStyle = {
  right: 10,
  top: 10,
};

const geolocateControlStyle = {
  right: 10,
  top: 10,
};

const Home = () => {
  // state
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 10.7631, //HCMUS lat
    longitude: 106.68246, /// HCMUS long
    zoom: 16,
  });
  // ad
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [boardData, setBoardData] = useState<any>(null);
  const [locationAds, setLocationAds] = useState<any[]>([]);

  // report
  const [reportpopupInfo, setReportPopupInfo] = useState<any>(null);
  const [reportboardData, setReportBoardData] = useState<any>(null);

  // control panel
  const [showPins, setShowPins] = useState<boolean>(true);
  const [showReports, setShowReports] = useState<boolean>(true);

  const { data } = usePlacements();
  const { data: reportData } = useReports();

  useEffect(() => {
    if (data) {
      setLocationAds(data);
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: Number(data?.[0]?.lat),
        longitude: Number(data?.[0]?.lng),
        zoom: 12, // set the zoom level as needed
      }));
    } else {
      setLocationAds([]);
    }
  }, [data]);

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      goongApiAccessToken={GOONG_MAPTILES_KEY}
      touchRotate={true}
      transitionDuration={100}
    >
      {/* Ads */}
      {locationAds && showPins && <Pins data={locationAds} setPopupInfo={setPopupInfo} setBoardData={setBoardData} />}

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
          <BoardList boardData={boardData} setBoardData={setBoardData} />
        </Popup>
      )}

      {/* Report */}
      {reportData && showReports && (
        <ReportPins data={reportData} setPopupInfo={setReportPopupInfo} setBoardData={setReportBoardData} />
      )}

      <ControlPanel
        setViewport={setViewport}
        showPins={showPins}
        setShowPins={setShowPins}
        showReports={showReports}
        setShowReports={setShowReports}
      />

      {/* Current location user */}
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={false}
        auto
      />

      {/* full screen */}
      <FullscreenControl style={fullscreenControlStyle} />
    </ReactMapGL>
  );
};

export default Home;
