import { queryKeys } from '@base/config/queryKeys';
import useMutationCustom from '@base/hooks/useMutationCustom';
import { useSnackBar } from '@base/hooks/useSnackbar';
import { axiosAPI } from '@base/utils/axios/api';
import { useMutation } from '@tanstack/react-query';

export const useAccountMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mAdd = useMutation(
    [queryKeys.accountAdd],
    (payload: any) => {
      return axiosAPI(`accounts`, 'POST', payload);
    },
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Create Successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Create Fail');
      },
    }
  );

  const mRoleChange = useMutation(
    [queryKeys.accountRoleChange],
    (payload: any) => {
      return axiosAPI(`accounts/role/${payload?.id}`, 'PATCH', payload);
    },
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Change role Successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Change role Fail');
      },
    }
  );

  const mDelete = useMutation(
    [queryKeys.accountDelete],
    (payload: any) => {
      return axiosAPI(`accounts/${payload?.id}`, 'DELETE');
    },
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Delete Successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Delete Fail');
      },
    }
  );

  return { mAdd, mRoleChange, mDelete };
};
