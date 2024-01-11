import { queryKeys } from '@base/config/queryKeys';
import useMutationCustom from '@base/hooks/useMutationCustom';
import { useSnackBar } from '@base/hooks/useSnackbar';

export const useReportMutation = (id: string) => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mSave = useMutationCustom([queryKeys.auth_login], `reports/${id}`, 'PATCH', {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Update Successfully');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueSuccessBar('Update Fail');
    },
  });

  return { mSave };
};
