import React, { Suspense, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import writeConfig from './config';
import * as keyNames from './config/keyNames';
import { finalizeParams } from './payload';
import WriteFields from './WriteFields';
import { getWriteForm } from '@base/utils/getWriteForm';
import LoadingButton from '@base/components/LoadingButton';

interface LoginProps {}

const Login = (props: LoginProps) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const layoutFields: string[] = [keyNames.KEY_NAME_LOGIN_USER_NAME, keyNames.KEY_NAME_LOGIN_PASSWORD];

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

  return (
    <>
      <form style={{ width: 'fit-content', margin: 'auto' }}>
        <Suspense fallback={<></>}>
          <Stack padding={2} spacing={2} width={500} border={border}>
            <WriteFields fields={fields} watch={watch} setValue={setValue} control={control} errors={errors} />
            <Stack>
              <Typography color={theme.palette.primary.main} sx={{ cursor: 'pointer' }}>
                Quên mật khẩu
              </Typography>
              <LoadingButton
                size="medium"
                variant="contained"
                // loading={mAdd.isLoading}
                onClick={() => {
                  handleSubmit((data) => onSubmit(data), onError)();
                }}
              >
                Đăng nhập
              </LoadingButton>
            </Stack>
          </Stack>
        </Suspense>
      </form>
    </>
  );
};

export default Login;
