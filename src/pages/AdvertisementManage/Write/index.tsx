import React, { Suspense, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Grid, ImageList, ImageListItem, Stack, Typography, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
// import { ImageReport, itemData } from '../dummyData';
import writeConfig from './config';
import * as keyNames from './config/keyNames';
import { finalizeParams } from './payload';
import WriteFields from './WriteFields';
import { getWriteForm } from '@base/utils/getWriteForm';
import { SET_TIMEOUT } from '@base/config/constants';
import MiModal from '@base/components/MiModal';
import LoadingButton from '@base/components/LoadingButton';
import { userRequestMutation } from 'src/hooks/userRequestMutation';
import { queryKeys } from '@base/config/queryKeys';
import { usePlacement } from 'src/hooks/usePlacements';
import { useDistrictMutation } from 'src/hooks/district/useDistrictMutation';
import {
  useAdvertisement,
  useAdvertisementDetail,
  useAdvertisements2,
  useAdvertisements2Mutation,
} from 'src/hooks/useAdvertisements';

interface WritePageProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  updateData?: any;
}

const WritePage = (props: WritePageProps) => {
  const { title, isOpen, onClose, updateData } = props;
  console.log('🚀 ~ updateData:', updateData);
  const theme = useTheme();
  const queryClient = useQueryClient();
  const layoutFields: string[] = [
    keyNames.KEY_NAME_AD_WIDTH,
    keyNames.KEY_NAME_AD_HEIGH,
    keyNames.KEY_NAME_AD_IMAGE,
    keyNames.KEY_NAME_AD_PLACEMENT_ID,
    keyNames.KEY_NAME_AD_AMOUNT,
    keyNames.KEY_NAME_AD_ADVERTISING_TYPE,
    keyNames.KEY_NAME_AD_COMPANY,
    keyNames.KEY_NAME_AD_START_DATE,
    keyNames.KEY_NAME_AD_END_DATE,
  ];

  const { fields, defaultValues, getParams } = getWriteForm(layoutFields, writeConfig);

  const { data: viewData } = useAdvertisementDetail(updateData?.id, {
    enabled: !!updateData?.id,
  });

  //react-hook-form
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

  useEffect(() => {
    if (viewData) {
      console.log('🚀 ~ useEffect ~ viewData:', viewData);

      const newFormData = {
        [keyNames.KEY_NAME_AD_WIDTH]: viewData?.width,
        [keyNames.KEY_NAME_AD_HEIGH]: viewData?.height,
        // [keyNames.KEY_NAME_AD_IMAGE]: viewData?.image,
        [keyNames.KEY_NAME_AD_PLACEMENT_ID]: {
          label: viewData?.placement?.ward?.wardName + ', ' + viewData?.placement?.ward?.district?.districtName,
          value: viewData?.placement.id,
        }, // need id
        [keyNames.KEY_NAME_AD_AMOUNT]: viewData?.amount, // need id
        [keyNames.KEY_NAME_AD_ADVERTISING_TYPE]: {
          label: viewData?.advertisingType?.name,
          value: viewData?.advertisingType?.id,
        },
        [keyNames.KEY_NAME_AD_COMPANY]: { label: viewData?.company?.name, value: viewData?.company?.id }, // need id};
        [keyNames.KEY_NAME_AD_START_DATE]: viewData?.startDate, // need id};
        [keyNames.KEY_NAME_AD_END_DATE]: viewData?.startDate, // need id};
      };

      reset && reset(newFormData);
    }
  }, [viewData]);

  const { mAdd, mUpdate } = useAdvertisements2Mutation();
  const { mUploadImage } = userRequestMutation();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params, updateData); // define add or update here
    console.log('🚀 ~ parsedParams:', parsedParams);
    const paramUpload: any = {
      file: params[keyNames.KEY_NAME_AD_IMAGE]?.[0],
    };

    if (paramUpload?.file) {
      const imageUrl = await mUploadImage.mutateAsync(paramUpload);
      parsedParams.image = imageUrl;
    } else if (updateData && updateData?.image) {
      parsedParams.image = updateData?.image;
    }

    if (updateData) {
      mUpdate.mutate(parsedParams, {
        onSuccess(data, variables: any, context) {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.advertisement2]);
          }, SET_TIMEOUT);

          onClose && onClose();
          reset && reset();
        },
      });
    } else {
      mAdd.mutate(parsedParams, {
        onSuccess(data, variables: any, context) {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.advertisement2]);
          }, SET_TIMEOUT);

          onClose && onClose();
          reset && reset();
        },
      });
    }
  };

  const border = `1px solid ${theme.palette.divider}`;

  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center" px={1}>
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              size="medium"
              variant="outlined"
              color="secondary"
              onClick={() => {
                reset && reset();
                onClose && onClose();
              }}
            >
              Hủy bỏ
            </Button>
            <LoadingButton
              size="medium"
              variant="contained"
              loading={mAdd.isLoading}
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
              }}
            >
              {updateData ? 'Cập nhật' : 'Thêm'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [reset, mAdd.isLoading, isValid, updateData]);

  return (
    <>
      <MiModal
        title={updateData ? 'Cập nhật quảng cáo' : 'Thêm quảng cáo'}
        isOpen={isOpen}
        footer={Footer}
        onClose={onClose}
        size="sm"
      >
        <form>
          <Suspense fallback={<></>}>
            <Box padding={2}>
              <WriteFields
                fields={fields}
                watch={watch}
                setValue={setValue}
                control={control}
                errors={errors}
                isEdit={!!updateData}
                updateData={updateData}
              />
            </Box>
          </Suspense>
        </form>
      </MiModal>
    </>
  );
};

export default WritePage;
