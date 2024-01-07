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
        enqueueSuccessBar('Upload Successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Upload Fail');
      },
    },
    { 'Content-Type': 'multipart/form-data' },
    undefined,
    undefined
  );

  const mCancel = useMutation(
    [queryKeys.requestCancel],
    (payload: any) => {
      return axiosAPI(`requests/cancel/${payload?.id}`, 'DELETE');
    },
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Cancel Successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Cancel Fail');
      },
    }
  );

  const mCreateRequest = useMutationCustom([queryKeys.requestCreate], `requests`, 'POST', {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Create Resquest Successfully');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Create Resquest Fail');
    },
  });

  return { mUploadImage, mCancel, mCreateRequest };
};
