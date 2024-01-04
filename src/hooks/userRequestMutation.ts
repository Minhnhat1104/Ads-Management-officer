import { queryKeys } from '@base/config/queryKeys';
import useMutationCustom from '@base/hooks/useMutationCustom';
import { useSnackBar } from '@base/hooks/useSnackbar';
import { axiosAPI } from '@base/utils/axios/api';
import { useMutation } from '@tanstack/react-query';

export const userRequestMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mUploadImage = useMutationCustom(
    [queryKeys.requestStorageImage],
    `storage`,
    'POST',
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Login Successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueSuccessBar('Login Fail');
      },
    },
    { 'Content-Type': 'multipart/form-data' },
    undefined,
    undefined,
    false
  );

  const mCancel = useMutation(
    [queryKeys.requestCancel],
    (payload: any) => {
      return axiosAPI(`requests/cancel/${payload?.id}`, 'POST');
    },
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Cancel Successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueSuccessBar('Cancel Fail');
      },
    }
  );

  return { mUploadImage, mCancel };
};
