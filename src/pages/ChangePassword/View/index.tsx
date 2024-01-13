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
import MiModal from '@base/components/MiModal';
import LoadingButton from '@base/components/LoadingButton';
import { queryKeys } from '@base/config/queryKeys';
import { useNavigate } from 'react-router-dom';
import { userProfileMutation } from 'src/hooks/userInforMutation';
import Toolbar from './Toolbar';
import { useAuthMutation } from '@base/hooks/useAuthMutation';

interface WritePageProps {
  title?: string;
  updateData?: any;
}

const ChangePassword = (props: WritePageProps) => {
  const { title, updateData } = props;
  console.log('🚀 ~ updateData:', updateData);
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const layoutFields: string[] = [keyNames.KEY_NAME_PASS_OLD, keyNames.KEY_NAME_PASS_NEW];

  const { fields, defaultValues, getParams } = getWriteForm(layoutFields, writeConfig);

  const { mChangePassword } = useAuthMutation();

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
  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params); // define add or update here
    console.log('submit', parsedParams);
    mChangePassword.mutate(parsedParams.editData, {
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
          <Typography sx={{ fontSize: 20, fontWeight: 600, marginLeft: 2, marginTop: 2 }}>Thay đổi mật khẩu</Typography>
          {/* <Toolbar /> */}
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
                  navigate(-1);
                  reset && reset();
                }}
              >
                Hủy bỏ
              </Button>
              <LoadingButton
                size="medium"
                variant="contained"
                // loading={mEditInfo.isLoading}
                onClick={() => {
                  handleSubmit((data) => onSubmit(data), onError)();
                }}
              >
                Thay đổi
              </LoadingButton>
            </Stack>
          </Box>
        </Suspense>
      </form>
    </>
  );
};

export default ChangePassword;
