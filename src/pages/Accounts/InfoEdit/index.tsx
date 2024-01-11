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
import { useAccountMutation } from 'src/hooks/account/useAccountMutation';
import { useAccount } from 'src/hooks/account/useAccounts';
import { USER_ROLE_OPTIONS } from 'src/constants';

interface InfoEditProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  updateData?: any;
}

const InfoEdit = (props: InfoEditProps) => {
  const { title, isOpen, onClose, updateData } = props;
  console.log('🚀 ~ updateData:', updateData);
  const theme = useTheme();
  const queryClient = useQueryClient();
  const layoutFields: string[] = [keyNames.KEY_NAME_ACCOUNT_ROLE, keyNames.KEY_NAME_ACCOUNT_WARD];

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

  const { mRoleChange } = useAccountMutation();
  const { data: viewData } = useAccount(updateData?.id, { enabled: !!updateData?.id });

  useEffect(() => {
    if (viewData) {
      const newFormData = {
        [keyNames.KEY_NAME_ACCOUNT_ROLE]:
          USER_ROLE_OPTIONS.find((_option) => _option.value === viewData?.roleName) || null,
        [keyNames.KEY_NAME_ACCOUNT_WARD]: { label: viewData?.ward, value: viewData?.wardId },
      };

      reset && reset(newFormData);
    }
  }, [viewData]);

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params, updateData); // define add or update here
    mRoleChange.mutate(parsedParams, {
      onSuccess(data, variables: any, context) {
        setTimeout(() => {
          queryClient.invalidateQueries([queryKeys.accounts]);
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
              loading={mRoleChange.isLoading}
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
              }}
            >
              Cập nhật
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [reset, mRoleChange.isLoading, isValid, updateData]);

  return (
    <>
      <MiModal
        title={title ? title : 'Chỉnh sửa tài khoản'}
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

export default InfoEdit;
