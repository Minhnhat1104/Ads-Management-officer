import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useAdvertisements = (params?: any, placementId?: string, opts?: any) => {
  return useGet<any>(
    [queryKeys.advertisements, placementId, keyStringify(params)],
    `advertisement/placement/${placementId}`,
    params,
    {
      keepPreviousData: true,
      ...opts,
    }
  );
};

export const useAdvertisementDetail = (id?: any, opts?: any) => {
  return useGet<any>([queryKeys.advertisementView, id], `advertisement/detail/${id}`, null, {
    ...opts,
  });
};

export const useAdvertisements2 = (params?: any, opts?: any) => {
  return useGet<any>([queryKeys.advertisement2, keyStringify(params)], `advertisement`, params, {
    keepPreviousData: true,
    ...opts,
  });
};

import { useSnackBar } from '@base/hooks/useSnackbar';
import { axiosAPI } from '@base/utils/axios/api';
import { useMutation } from '@tanstack/react-query';

export const useAdvertisements2Mutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mAdd = useMutation(
    [queryKeys.advertisementAdd],
    (payload: any) => {
      return axiosAPI(`advertisement`, 'POST', payload);
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
    [queryKeys.advertisementUpdate],
    (payload: any) => {
      const { id, ...others } = payload;
      return axiosAPI(`advertisement/${id}`, 'PATCH', others);
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
    [queryKeys.advertisementDelete],
    (payload: any) => {
      return axiosAPI(`advertisement/${payload?.id}`, 'DELETE');
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
