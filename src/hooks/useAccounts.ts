import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useAccounts = (params?: any, options: any = {}) => {
  return useGet<any>([queryKeys.accounts, keyStringify(params)], 'accounts/profile', params, {
    keepPreviousData: true,
    ...options,
  });
};
