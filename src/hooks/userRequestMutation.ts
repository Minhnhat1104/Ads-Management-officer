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

  const mAccept = useMutation(
    [queryKeys.requestCancel],
    (payload: any) => {
      return axiosAPI(`requests/${payload?.id}/approve`, 'PUT');
    },
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Accept Successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Accept Fail');
      },
    }
  );

  const mDeny = useMutation(
    [queryKeys.requestCancel],
    (payload: any) => {
      return axiosAPI(`requests/${payload?.id}/deny`, 'PUT');
    },
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Deny Successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Deny Fail');
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

  const mRequestEditPlacement = useMutationCustom([queryKeys.requestEditPlacement], `requests/edit/placement`, 'POST', {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Resquest edit placement Successfully');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Resquest edit placement Fail');
    },
  });

  return { mUploadImage, mCancel, mCreateRequest, mAccept, mDeny, mRequestEditPlacement };
};
