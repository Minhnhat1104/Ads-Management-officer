import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useAccounts = (params: any, options: any = {}) => {
  return useGet<any>([queryKeys.accounts], 'accounts', params, {
    keepPreviousData: true,
    ...options,
  });
};

export const useAccount = (id: any, options: any = {}) => {
  return useGet<any>([queryKeys.accountView], `accounts/${id}`, null, {
    keepPreviousData: true,
    ...options,
  });
};
