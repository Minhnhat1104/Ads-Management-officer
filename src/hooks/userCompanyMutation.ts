import { queryKeys } from '@base/config/queryKeys';
import useMutationCustom from '@base/hooks/useMutationCustom';
import { useSnackBar } from '@base/hooks/useSnackbar';
import { axiosAPI } from '@base/utils/axios/api';
import { useMutation } from '@tanstack/react-query';

export const userCompanyMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mCreateRequest = useMutationCustom([queryKeys.companyCreate], `company`, 'POST', {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Create Company Successfully');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueSuccessBar('Create Company Fail');
    },
  });

  return { mCreateRequest };
};
