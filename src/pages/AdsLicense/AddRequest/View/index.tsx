import React, { Suspense } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { Box, Button, Grid, Stack, useTheme } from '@mui/material';
import ReactMapGL, { GeolocateControl, FullscreenControl, Popup } from '@goongmaps/goong-map-react';
// project
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

import { LIST_TABLE_PAGE_SIZE, SET_TIMEOUT } from '@base/config/constants';

import * as keyNames from '../config/keyNames';
import { useForm } from 'react-hook-form';
import { userRequestMutation } from 'src/hooks/userRequestMutation';
import { getWriteForm } from '@base/utils/getWriteForm';
import { finalizeParams } from '../payload';
import { queryKeys } from '@base/config/queryKeys';
import writeConfig from '../config';
import WriteFields from '../WriteFields';
import Toolbar from '../Toolbar';
import LoadingButton from '@base/components/LoadingButton';
import { GOONG_MAPTILES_KEY } from 'src/constants/goongmap';
import Pins from '@pages/Home/Pins';
import { usePlacements } from 'src/hooks/usePlacements';

interface AddRequestProps {}

interface WritePageProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  updateData?: any;
}

const AddRequest = (props: AddRequestProps) => {
  // const { title, isOpen, onClose, updateData } = props;
  const updateData = '';
  const theme = useTheme();
  const queryClient = useQueryClient();
  const layoutFields: string[] = [
    keyNames.KEY_NAME_REQUEST_WIDTH,
    keyNames.KEY_NAME_REQUEST_HEIGHT,
    keyNames.KEY_NAME_REQUEST_IMAGE,
    keyNames.KEY_NAME_REQUEST_PLACEMENT,
    keyNames.KEY_NAME_REQUEST_AMOUNT,
    keyNames.KEY_NAME_REQUEST_ADVERTISING_TYPE,
    keyNames.KEY_NAME_REQUEST_COMPANY,
    keyNames.KEY_NAME_REQUEST_START_DATE,
    keyNames.KEY_NAME_REQUEST_END_DATE,
  ];

  const { fields, defaultValues, getParams } = getWriteForm(layoutFields, writeConfig);

  //react-hook
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });

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

  const { data } = usePlacements();

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
        console.log(latitude, longitude);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  const { mUploadImage, mCreateRequest } = userRequestMutation();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params); // define add or update here
    const paramUpload: any = {
      file: params[keyNames.KEY_NAME_REQUEST_IMAGE]?.[0],
    };

    const imageUrl = await mUploadImage.mutateAsync(paramUpload);
    parsedParams.image = imageUrl;
    console.log('🚀 ~ file: index.tsx:68 ~ parsedParams:', parsedParams);

    await mCreateRequest.mutateAsync(parsedParams, {
      onSuccess(data, variables: any, context) {
        setTimeout(() => {
          queryClient.invalidateQueries([queryKeys.requests]);
        }, SET_TIMEOUT);

        // onClose && onClose();
        reset && reset();
      },
    });
  };

  return (
    <>
      <Toolbar placementId={''} />

      <ReactMapGL
        {...viewport}
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
        goongApiAccessToken={GOONG_MAPTILES_KEY}
        touchRotate={true}
        transitionDuration={100}
      >
        {locationAds && <Pins data={locationAds} setPopupInfo={setPopupInfo} setBoardData={setBoardData} />}
      </ReactMapGL>

      <form style={{ height: 300 }}>
        <Suspense fallback={<></>}>
          <Box padding={2}>
            <WriteFields
              fields={fields}
              watch={watch}
              setValue={setValue}
              control={control}
              errors={errors}
              isEdit={!!updateData}
              // updateData={updateData}
            />
          </Box>
          <Stack direction="row" spacing={2} alignItems="center" marginLeft={2}>
            <LoadingButton
              size="medium"
              sx={{ paddingLeft: 4, paddingRight: 4 }}
              variant="contained"
              // loading={mAdd.isLoading}
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
                // handleSubmit((data) => console.log(data))();
              }}
            >
              Save
            </LoadingButton>
          </Stack>
        </Suspense>
      </form>
    </>
  );
};

export default AddRequest;