import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useRequests = (params?: any, options: any = {}) => {
  return useGet<any>([queryKeys.requests, keyStringify(params)], 'requests', params, {
    keepPreviousData: true,
    ...options,
  });
};
