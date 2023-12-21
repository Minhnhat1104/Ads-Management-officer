import React, { Suspense, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Grid, ImageList, ImageListItem, Stack, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { ImageReport, itemData } from '../dummyData';
import writeConfig from './config';
import * as keyNames from './config/keyNames';
import { finalizeParams } from './payload';
import WriteFields from './WriteFields';
import { getWriteForm } from '@base/utils/getWriteForm';
import { SET_TIMEOUT } from '@base/config/constants';
import MiModal from '@base/components/MiModal';
import LoadingButton from '@base/components/LoadingButton';

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
    keyNames.KEY_NAME_ADS_1,
    keyNames.KEY_NAME_ADS_2,
    keyNames.KEY_NAME_ADS_3,
    keyNames.KEY_NAME_ADS_4,
    keyNames.KEY_NAME_ADS_5,
  ];

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

  // const { mAdd } = useAdminResourceMutation();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params); // define add or update here
    // mAdd.mutate(parsedParams, {
    //   onSuccess(data, variables: any, context) {
    //     setTimeout(() => {
    //       queryClient.invalidateQueries([queryKeys.adminResources]);
    //     }, SET_TIMEOUT);

    //     onClose && onClose();
    //     reset && reset();
    //   }
    // });
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
              'Cancel'
            </Button>
            <LoadingButton
              size="medium"
              variant="contained"
              // loading={mAdd.isLoading}
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
              }}
            >
              Save
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [reset, isValid]);

  return (
    <>
      <MiModal title={title ? title : 'Chi tiết báo cáo'} isOpen={isOpen} footer={Footer} onClose={onClose} size="sm">
        <form>
          <Suspense fallback={<></>}>
            <Box padding={2}>
              <ImageList sx={{ width: 500, height: 450, marginTop: 10 }} cols={3} rowHeight={164}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Suspense>
        </form>
      </MiModal>
    </>
  );
};

export default WritePage;
