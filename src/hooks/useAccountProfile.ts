import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';

export const useAccountProfile = (options: any = {}) => {
  return useGet<any>([queryKeys.accountProfile], 'accounts/profile', null, {
    keepPreviousData: true,
    ...options,
  });
};
