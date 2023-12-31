import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useReports = (params?: any, options: any = {}) => {
  return useGet<any>([queryKeys.reports, keyStringify(params)], 'reports', params, {
    keepPreviousData: true,
    ...options,
  });
};
