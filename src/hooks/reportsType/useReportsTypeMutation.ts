import { queryKeys } from '@base/config/queryKeys';
import { useSnackBar } from '@base/hooks/useSnackbar';
import { axiosAPI } from '@base/utils/axios/api';
import { useMutation } from '@tanstack/react-query';

export const useReportsTypeMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mAdd = useMutation(
    [queryKeys.reportsTypeAdd],
    (payload: any) => {
      return axiosAPI(`reports/type`, 'POST', payload);
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

  const mUpdate = useMutation(
    [queryKeys.reportsTypeUpdate],
    (payload: any) => {
      return axiosAPI(`reports/type/${payload?.id}`, 'PATCH');
    },
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Update Successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Update Fail');
      },
    }
  );

  const mDelete = useMutation(
    [queryKeys.reportsTypeDelete],
    (payload: any) => {
      return axiosAPI(`reports/type/${payload?.id}`, 'DELETE');
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

  return { mAdd, mUpdate, mDelete };
};
