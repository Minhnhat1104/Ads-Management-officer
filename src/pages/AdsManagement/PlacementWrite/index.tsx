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
    keyNames.KEY_NAME_PLACEMENT_LAT,
    keyNames.KEY_NAME_PLACEMENT_LNG,
    keyNames.KEY_NAME_PLACEMENT_PLANNED,
    keyNames.KEY_NAME_PLACEMENT_LOCATION_TYPE_ID,
    keyNames.KEY_NAME_PLACEMENT_FORMAT_ID,
    keyNames.KEY_NAME_PLACEMENT_ADDRESS,
    keyNames.KEY_NAME_PLACEMENT_WARD_ID,
    keyNames.KEY_NAME_PLACEMENT_REASON,
  ];

  const { fields, defaultValues, getParams } = getWriteForm(layoutFields, writeConfig);

  const { data: viewData } = usePlacement(updateData?.id, {
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
        [keyNames.KEY_NAME_PLACEMENT_LAT]: viewData?.lat,
        [keyNames.KEY_NAME_PLACEMENT_LNG]: viewData?.lng,
        [keyNames.KEY_NAME_PLACEMENT_PLANNED]: viewData?.planned,
        [keyNames.KEY_NAME_PLACEMENT_LOCATION_TYPE_ID]: {
          label: viewData?.locationType?.name,
          value: viewData?.locationType?.id,
        }, // need id
        [keyNames.KEY_NAME_PLACEMENT_FORMAT_ID]: { label: viewData?.format?.name, value: viewData?.format?.id }, // need id
        [keyNames.KEY_NAME_PLACEMENT_ADDRESS]: viewData?.address,
        [keyNames.KEY_NAME_PLACEMENT_WARD_ID]: { label: viewData?.ward?.name, value: viewData?.ward?.id }, // need id
      };

      reset && reset(newFormData);
    }
  }, [viewData]);

  const { mRequestEditPlacement } = userRequestMutation();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params, updateData); // define add or update here
    mRequestEditPlacement.mutate(parsedParams, {
      onSuccess(data, variables: any, context) {
        setTimeout(() => {
          queryClient.invalidateQueries([queryKeys.placements]);
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
              loading={mRequestEditPlacement.isLoading}
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
  }, [reset, mRequestEditPlacement.isLoading, isValid, updateData]);

  return (
    <>
      <MiModal
        title={title ? title : 'Yêu cầu chỉnh sửa điểm đặt'}
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
