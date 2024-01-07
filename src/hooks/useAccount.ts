import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';

export const useAccount = (options: any = {}) => {
  return useGet<any>([queryKeys.accounts], 'accounts/profile', null, {
    keepPreviousData: true,
    ...options,
  });
};
