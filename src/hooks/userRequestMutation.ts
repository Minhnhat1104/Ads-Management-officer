import { queryKeys } from '@base/config/queryKeys';
import useMutationCustom from '@base/hooks/useMutationCustom';
import { useSnackBar } from '@base/hooks/useSnackbar';

export const useReportMutation = (id: string) => {
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

  return { mUploadImage };
};
