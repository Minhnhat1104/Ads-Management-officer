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

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginProps {}

const Login = (props: LoginProps) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const layoutFields: string[] = [keyNames.KEY_NAME_LOGIN_USER_NAME, keyNames.KEY_NAME_LOGIN_PASSWORD];

  const navigate = useNavigate();

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

  const login = (token: any) => {
    // Optionally, you can save the token to localStorage or a cookie
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('refreshToken', token.refreshToken);
  };

  const logout = () => {
    /* logic to handle user logout */
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params); // define add or update here

    try {
      const response = await axios.post('http://localhost:4000/auth/signin', parsedParams);
      // handle response here
      console.log(response.data);
      login(response.data);
    } catch (error) {
      // handle error here
      console.error(error);
    }
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
                  handleSubmit((formData) => onSubmit(formData), onError)();
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
