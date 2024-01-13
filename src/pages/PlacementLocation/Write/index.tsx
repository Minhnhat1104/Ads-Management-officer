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
import { queryKeys } from '@base/config/queryKeys';
import { usePlacement } from 'src/hooks/usePlacements';
import { useReportsTypeMutation } from 'src/hooks/reportsType/useReportsTypeMutation';
import { usePlacementLocationTypeMutation } from 'src/hooks/placementLocationType/usePlacementLocationTypeMutation';
import { usePlacementMutation } from 'src/hooks/usePlacementMutation';

interface WritePageProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  updateData?: any;
}

const WritePage = (props: WritePageProps) => {
  const { title, isOpen, onClose, updateData } = props;
  const theme = useTheme();
  const queryClient = useQueryClient();
  const layoutFields: string[] = [
    keyNames.KEY_NAME_PLACEMENT_LOCATION_ADDRESSS,
    keyNames.KEY_NAME_PLACEMENT_LOCATION_POSITION,
    keyNames.KEY_NAME_PLACEMENT_LOCATION_PLANNED,
    keyNames.KEY_NAME_PLACEMENT_LOCATION_TYPEID,
    keyNames.KEY_NAME_PLACEMENT_LOCATION_FORMATID,
    keyNames.KEY_NAME_PLACEMENT_LOCATION_WARDID,
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
      console.log('🚀 ~ useEffect ~ updateData1:', viewData);
      // console.log('🚀 ~ useEffect ~ viewData:', viewData);
      const newFormData = {
        [keyNames.KEY_NAME_PLACEMENT_LOCATION_POSITION]: { lat: Number(viewData?.lat), lng: Number(viewData?.lng) },
        [keyNames.KEY_NAME_PLACEMENT_LOCATION_PLANNED]: viewData?.planned,
        [keyNames.KEY_NAME_PLACEMENT_LOCATION_TYPEID]: {
          label: viewData?.locationType?.name,
          value: viewData?.locationType?.id,
        }, // need id
        [keyNames.KEY_NAME_PLACEMENT_LOCATION_FORMATID]: { label: viewData?.format?.name, value: viewData?.format?.id }, // need id
        [keyNames.KEY_NAME_PLACEMENT_LOCATION_ADDRESSS]: viewData?.address,
        [keyNames.KEY_NAME_PLACEMENT_LOCATION_WARDID]: { label: viewData?.ward?.name, value: viewData?.ward?.id }, // need id};
      };
      reset && reset(newFormData);
    }
  }, [viewData]);

  const { mAdd, mUpdate } = usePlacementMutation();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params, updateData); // define add or update here

    if (updateData) {
      mUpdate.mutate(parsedParams.editData, {
        onSuccess(data, variables: any, context) {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.placementLocation]);
            queryClient.invalidateQueries([queryKeys.placements]);
          }, SET_TIMEOUT);
          reset && reset();
          onClose && onClose();
        },
      });
    } else {
      mAdd.mutate(parsedParams.editData, {
        onSuccess(data, variables: any, context) {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.placementLocation]);
            queryClient.invalidateQueries([queryKeys.placements]);
          }, SET_TIMEOUT);
          reset && reset();
          onClose && onClose();
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
        title={updateData ? 'Cập nhật điểm đặt quảng cáo' : 'Thêm điểm đặt quảng cáo'}
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
