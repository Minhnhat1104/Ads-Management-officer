import React, { Suspense, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Grid, Stack, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

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
              Hủy
            </Button>
            <LoadingButton
              size="medium"
              variant="contained"
              // loading={mAdd.isLoading}
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
              }}
            >
              Lưu
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [reset, isValid]);

  return (
    <>
      <MiModal title={'Gửi yêu cầu cấp phép'} isOpen={isOpen} footer={Footer} onClose={onClose} size="sm">
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
