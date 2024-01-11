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
import { useReportMutation } from 'src/hooks/useReportMutation';

interface WritePageProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const WritePage = (props: WritePageProps) => {
  const { title, isOpen, onClose, id } = props;
  const theme = useTheme();
  const queryClient = useQueryClient();
  const layoutFields: string[] = [keyNames.KEY_NAME_REQUEST_STATUS, keyNames.KEY_NAME_REQUEST_SOLUTION];

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

  // useEffect(() => {
  //   if (viewData) {
  //     const newFormData = {
  //       // [keyNames.KEY_NAME_PLACEMENT_LAT]: viewData?.lat,
  //     };

  //     reset && reset(newFormData);
  //   }
  // }, [viewData]);

  const { mSave } = useReportMutation(id);

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params); // define add or update here
    mSave.mutate(parsedParams, {
      onSuccess(data, variables: any, context) {
        setTimeout(() => {
          queryClient.invalidateQueries([queryKeys.reportViewByReportId, id]);
          queryClient.invalidateQueries([queryKeys.reports]);
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
              loading={mSave.isLoading}
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
              }}
            >
              Xử lý
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [reset, mSave.isLoading, isValid]);

  return (
    <>
      <MiModal title={title ? title : 'Xử lí báo cáo'} isOpen={isOpen} footer={Footer} onClose={onClose} size="sm">
        <form>
          <Suspense fallback={<></>}>
            <Box padding={2}>
              <WriteFields fields={fields} watch={watch} setValue={setValue} control={control} errors={errors} />
            </Box>
          </Suspense>
        </form>
      </MiModal>
    </>
  );
};

export default WritePage;
