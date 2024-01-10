import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useReportsType = (options: any = {}) => {
  return useGet<any>([queryKeys.reportsType], '/reports/type', null, {
    keepPreviousData: true,
    ...options,
  });
};
