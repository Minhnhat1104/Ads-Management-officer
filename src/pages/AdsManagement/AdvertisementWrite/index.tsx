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
import { useAdvertisementDetail } from 'src/hooks/useAdvertisements';

interface AdvertisementWriteProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  updateData?: any;
}

const AdvertisementWrite = (props: AdvertisementWriteProps) => {
  const { title, isOpen, onClose, updateData } = props;
  const theme = useTheme();
  const queryClient = useQueryClient();
  const layoutFields: string[] = [
    keyNames.KEY_NAME_AD_WIDTH,
    keyNames.KEY_NAME_AD_HEIGHT,
    // keyNames.KEY_NAME_AD_IMAGE,
    // keyNames.KEY_NAME_AD_PLACEMENT_ID,
    keyNames.KEY_NAME_AD_AMOUNT,
    keyNames.KEY_NAME_AD_ADVERTISING_TYPE_ID,
    keyNames.KEY_NAME_AD_COMPANY_ID,
    keyNames.KEY_NAME_AD_START_DATE,
    keyNames.KEY_NAME_AD_END_DATE,
    keyNames.KEY_NAME_AD_EDIT_REASON,
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
      const newFormData = {
        [keyNames.KEY_NAME_AD_WIDTH]: viewData?.width,
        [keyNames.KEY_NAME_AD_HEIGHT]: viewData?.height,
        [keyNames.KEY_NAME_AD_PLACEMENT_ID]: {
          label: viewData?.placement?.ward?.wardName,
          value: viewData?.placement?.id,
        },
        [keyNames.KEY_NAME_AD_AMOUNT]: viewData?.amount,
        [keyNames.KEY_NAME_AD_ADVERTISING_TYPE_ID]: {
          label: viewData?.advertisingType?.name,
          value: viewData?.advertisingType?.id,
        },
        [keyNames.KEY_NAME_AD_COMPANY_ID]: { label: viewData?.company?.name, value: viewData?.company?.id },
        [keyNames.KEY_NAME_AD_START_DATE]: viewData?.startDate,
        [keyNames.KEY_NAME_AD_END_DATE]: viewData?.endDate,
        [keyNames.KEY_NAME_AD_EDIT_REASON]: '',
      };

      reset && reset(newFormData);
    }
  }, [viewData]);

  const { mRequestEditAd } = userRequestMutation();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params, viewData); // define add or update here
    mRequestEditAd.mutate(parsedParams, {
      onSuccess(data, variables: any, context) {
        setTimeout(() => {
          queryClient.invalidateQueries([queryKeys.advertisementView]);
        }, SET_TIMEOUT);

        onClose && onClose();
        reset && reset();
      },
    });
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
              loading={mRequestEditAd.isLoading}
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
              }}
            >
              Gửi yêu cầu chỉnh sửa
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [reset, mRequestEditAd.isLoading, isValid, viewData]);

  return (
    <>
      <MiModal
        title={title ? title : 'Yêu cầu chỉnh sửa bảng quảng cáo'}
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

export default AdvertisementWrite;
