import { queryKeys } from '@base/config/queryKeys';
import useMutationCustom from '@base/hooks/useMutationCustom';
import { useSnackBar } from '@base/hooks/useSnackbar';
import { axiosAPI } from '@base/utils/axios/api';
import { useMutation } from '@tanstack/react-query';

export const useRequestEditMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPlacementApprove = useMutation(
    [queryKeys.requestEditsPlacementsApprove],
    (payload: any) => {
      return axiosAPI(`requests/edit/placement/approve/${payload?.id}`, 'PUT');
    },
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Approve Successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Approve Fail');
      },
    }
  );

  const mPlacementDeny = useMutation(
    [queryKeys.requestEditsPlacementsApprove],
    (payload: any) => {
      return axiosAPI(`requests/edit/placement/deny/${payload?.id}`, 'PUT');
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

  const mAdApprove = useMutation(
    [queryKeys.requestEditsAdsApprove],
    (payload: any) => {
      return axiosAPI(`requests/edit/advertisement/approve/${payload?.id}`, 'PUT');
    },
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Approve Successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Approve Fail');
      },
    }
  );

  const mAdDeny = useMutation(
    [queryKeys.requestEditsAdsDeny],
    (payload: any) => {
      return axiosAPI(`requests/edit/advertisement/deny/${payload?.id}`, 'PUT');
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

  return { mPlacementApprove, mPlacementDeny, mAdApprove, mAdDeny };
};
