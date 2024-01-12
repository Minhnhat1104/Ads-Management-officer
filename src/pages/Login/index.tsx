import React, { Suspense, useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import writeConfig from './config';
import * as keyNames from './config/keyNames';
import { finalizeParams } from './payload';
import WriteFields from './WriteFields';
import { getWriteForm } from '@base/utils/getWriteForm';
import LoadingButton from '@base/components/LoadingButton';

import { useNavigate } from 'react-router-dom';
import { useAuthMutation } from '@base/hooks/useAuthMutation';
import { AuthContext } from '@base/auth/AuthProvider';

interface LoginProps {}

const Login = (props: LoginProps) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
    register,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });

  const { mLogin } = useAuthMutation();
  const { setIsAuthenticated } = useContext(AuthContext);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  const login = (data: any) => {
    // Optionally, you can save the token to localStorage or a cookie
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setIsAuthenticated && setIsAuthenticated(true);
  };

  const logout = () => {
    /* logic to handle user logout */
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated && setIsAuthenticated(false);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params); // define add or update here

    mLogin.mutate(parsedParams, {
      onSuccess(data, variables, context) {
        login(data);
      },
    });
  };

  const border = `1px solid ${theme.palette.divider}`;

  return (
    <>
      <form style={{ width: 'fit-content', margin: 'auto' }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2, fontSize: 40, marginBottom: 6 }}>
          Đăng nhập tài khoản cán bộ
        </Typography>
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
                loading={mLogin.isLoading}
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
