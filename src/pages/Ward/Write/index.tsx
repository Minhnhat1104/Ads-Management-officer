import React, { Suspense, useEffect, useMemo, useState } from 'react';
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
import { useWardMutation } from 'src/hooks/ward/useWardMutation';
import { useWards } from 'src/hooks/ward/useWards';
import { useDistricts } from 'src/hooks/district/useDistricts';

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
  const layoutFields: string[] = [keyNames.KEY_NAME_WARD_DISTRICT, keyNames.KEY_NAME_WARD_NAME];

  const { fields, defaultValues, getParams } = getWriteForm(layoutFields, writeConfig);

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

  const { data: viewDistrictData } = useDistricts();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (viewDistrictData) {
      setLoading(false);
    }
  }, [viewDistrictData]);

  useEffect(() => {
    if (!loading && updateData) {
      const district = viewDistrictData?.find(
        (district: { districtName: any }) => district?.districtName === updateData?.district
      );

      const newFormData = {
        [keyNames.KEY_NAME_WARD_NAME]: updateData?.wardName,
        [keyNames.KEY_NAME_WARD_DISTRICT]: district ? { label: district?.districtName, value: district?.id } : null,
      };
      reset && reset(newFormData);
    }
  }, [loading, updateData, viewDistrictData]);

  const { mAdd, mUpdate } = useWardMutation();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params, updateData); // define add or update here
    if (updateData) {
      mUpdate.mutate(parsedParams, {
        onSuccess(data, variables: any, context) {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.wards]);
          }, SET_TIMEOUT);

          onClose && onClose();
          reset && reset();
        },
      });
    } else {
      mAdd.mutate(parsedParams, {
        onSuccess(data, variables: any, context) {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.wards]);
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
        title={updateData ? 'Cập nhật phường' : 'Thêm phường'}
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
