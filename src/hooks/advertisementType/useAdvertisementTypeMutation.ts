import { queryKeys } from '@base/config/queryKeys';
import { useSnackBar } from '@base/hooks/useSnackbar';
import { axiosAPI } from '@base/utils/axios/api';
import { useMutation } from '@tanstack/react-query';

export const useAdvertisementsTypeMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mAdd = useMutation(
    [queryKeys.advertisementsTypeAdd],
    (payload: any) => {
      return axiosAPI(`advertisement/type`, 'POST', payload);
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
    [queryKeys.advertisementsTypeUpdate],
    (payload: any) => {
      const { id, ...others } = payload;
      return axiosAPI(`advertisement/type/${id}`, 'PATCH', others);
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
    [queryKeys.advertisementsTypeDelete],
    (payload: any) => {
      return axiosAPI(`advertisement/type/${payload?.id}`, 'DELETE');
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
