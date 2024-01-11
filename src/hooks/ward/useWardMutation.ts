import { queryKeys } from '@base/config/queryKeys';
import useMutationCustom from '@base/hooks/useMutationCustom';
import { useSnackBar } from '@base/hooks/useSnackbar';
import { axiosAPI } from '@base/utils/axios/api';
import { useMutation } from '@tanstack/react-query';

export const useWardMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mAdd = useMutation(
    [queryKeys.wardAdd],
    (payload: any) => {
      return axiosAPI(`ward`, 'POST', payload);
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
    [queryKeys.wardUpdate],
    (payload: any) => {
      const { id, ...others } = payload;
      return axiosAPI(`ward/${id}`, 'PATCH', others);
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
    [queryKeys.wardDelete],
    (payload: any) => {
      return axiosAPI(`ward/${payload?.id}`, 'DELETE');
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
