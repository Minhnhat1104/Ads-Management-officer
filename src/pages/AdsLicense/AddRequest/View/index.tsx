import React, { Suspense } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useSnackBar } from '@base/hooks/useSnackbar';
import { Box, Button, Grid, InputLabel, Stack, Typography, useTheme } from '@mui/material';

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
import MiniMap from '../Map';
import { useNavigate } from 'react-router-dom';

interface AddRequestProps {}

const AddRequest = (props: AddRequestProps) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const layoutFields: string[] = [
    keyNames.KEY_NAME_REQUEST_WIDTH,
    keyNames.KEY_NAME_REQUEST_HEIGHT,
    keyNames.KEY_NAME_REQUEST_IMAGE,
    // keyNames.KEY_NAME_REQUEST_PLACEMENT,
    keyNames.KEY_NAME_REQUEST_AMOUNT,
    keyNames.KEY_NAME_REQUEST_ADVERTISING_TYPE,
    keyNames.KEY_NAME_REQUEST_COMPANY,
    keyNames.KEY_NAME_REQUEST_START_DATE,
    keyNames.KEY_NAME_REQUEST_END_DATE,
  ];

  const { fields, defaultValues, getParams } = getWriteForm(layoutFields, writeConfig);

  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

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

  const { mUploadImage, mCreateRequest } = userRequestMutation();

  const [selectedPlacement, setSelectedPlacement] = useState<{ id?: string } | undefined>();

  const handleSetSelectedPlacement = (selectedPlacement: { id?: string } | undefined) => {
    setSelectedPlacement(selectedPlacement);
    console.log('selectedPlacement:', selectedPlacement);
  };
  const navigate = useNavigate();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    // console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    try {
      const params = getParams(formData);
      const parsedParams = finalizeParams(params);
      const paramUpload: any = {
        file: params[keyNames.KEY_NAME_REQUEST_IMAGE]?.[0],
      };

      const imageUrl = await mUploadImage.mutateAsync(paramUpload);
      parsedParams.image = imageUrl;

      if (selectedPlacement) {
        parsedParams.placementId = selectedPlacement.id;
      } else {
        enqueueErrorBar('Vui lòng chọn vị trí quảng cáo từ bản đồ');
        return;
      }

      await mCreateRequest.mutateAsync(parsedParams, {
        onSuccess(data, variables: any, context) {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.requests]);
          }, SET_TIMEOUT);

          navigate('/ads-license');
          reset && reset();
        },
      });
    } catch (error: any) {
      // Handle any errors that occur during the submission
      console.log('error:', error);
    }
  };

  return (
    <>
      <Toolbar />
      <Box px={2} height={500} mb={2}>
        <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>{'Điểm đặt'}</Typography>
        </InputLabel>
        <MiniMap onSelectedPlacement={handleSetSelectedPlacement} />
      </Box>

      <form style={{ height: 300 }}>
        <Suspense fallback={<></>}>
          <Box padding={2}>
            <WriteFields fields={fields} watch={watch} setValue={setValue} control={control} errors={errors} />
          </Box>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end" mr={2} pb={4}>
            <LoadingButton
              size="medium"
              sx={{ paddingLeft: 4, paddingRight: 4 }}
              variant="contained"
              loading={mUploadImage.isLoading || mCreateRequest.isLoading}
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
                // handleSubmit((data) => console.log(data))();
              }}
            >
              Tạo yêu cầu cấp phép
            </LoadingButton>
          </Stack>
        </Suspense>
      </form>
    </>
  );
};

export default AddRequest;
