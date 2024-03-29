import React, { Suspense, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Grid, ImageList, ImageListItem, Stack, Typography, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
// import { ImageReport, itemData } from '../dummyData';
import writeConfig from '../config';
import * as keyNames from '../config/keyNames';
import { finalizeParams } from '../payload';
import WriteFields from '../WriteFields';
import { getWriteForm } from '@base/utils/getWriteForm';
import { SET_TIMEOUT } from '@base/config/constants';
import LoadingButton from '@base/components/LoadingButton';
import { queryKeys } from '@base/config/queryKeys';
import { useAccountProfile } from 'src/hooks/useAccountProfile';
import { useLocation, useNavigate } from 'react-router-dom';
import { userProfileMutation } from 'src/hooks/userInforMutation';
import Toolbar from './Toolbar';
import { useWards } from 'src/hooks/ward/useWards';

interface WritePageProps {
  title?: string;
  updateData?: any;
}

const DetailInfo = (props: WritePageProps) => {
  const { title, updateData } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const layoutFields: string[] = [
    keyNames.KEY_NAME_INFO_FIRSTNAME,
    keyNames.KEY_NAME_INFO_LASTNAME,
    keyNames.KEY_NAME_INFO_EMAIL,
    keyNames.KEY_NAME_INFO_PHONE,
    keyNames.KEY_NAME_INFO_DATE_OF_BIRTH,
    // keyNames.KEY_NAME_INFO_WARD_ID,
  ];

  const { fields, defaultValues, getParams } = getWriteForm(layoutFields, writeConfig);

  const { data: viewData } = useAccountProfile();

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
      // console.log('WardId: ', wardId);
      const newFormData = {
        [keyNames.KEY_NAME_INFO_LASTNAME]: viewData?.lastName,
        [keyNames.KEY_NAME_INFO_FIRSTNAME]: viewData?.firstName,
        [keyNames.KEY_NAME_INFO_EMAIL]: viewData?.email,
        [keyNames.KEY_NAME_INFO_PHONE]: viewData?.phone,
        [keyNames.KEY_NAME_INFO_DATE_OF_BIRTH]: viewData?.dob, // need id
        // [keyNames.KEY_NAME_INFO_WARD_ID]: { label: viewData?.ward + ' ' + viewData?.district, value: viewData?.wardId }, // need id
      };
      reset && reset(newFormData);
    }
  }, [viewData]);

  const { mEditInfo } = userProfileMutation();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params, updateData); // define add or update here

    mEditInfo.mutate(parsedParams.editData, {
      onSuccess(data, variables: any, context) {
        setTimeout(() => {
          queryClient.invalidateQueries([queryKeys.accountProfile]);
        }, SET_TIMEOUT);

        reset && reset();
      },
    });
  };

  const border = `1px solid ${theme.palette.divider}`;

  return (
    <>
      <form>
        <Suspense fallback={<></>}>
          <Typography sx={{ fontSize: 20, fontWeight: 600, marginLeft: 2, marginTop: 2 }}>
            Thay đổi thông tin cá nhân
          </Typography>
          <Toolbar />
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
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end" sx={{ marginTop: 2 }}>
              <Button
                size="medium"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  navigate('/');
                  reset && reset();
                }}
              >
                Hủy bỏ
              </Button>
              <LoadingButton
                size="medium"
                variant="contained"
                loading={mEditInfo.isLoading}
                onClick={() => {
                  handleSubmit((data) => onSubmit(data), onError)();
                }}
              >
                Cập nhật thông tin
              </LoadingButton>
            </Stack>
          </Box>
        </Suspense>
      </form>
    </>
  );
};

export default DetailInfo;
