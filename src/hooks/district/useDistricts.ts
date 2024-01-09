import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useDistricts = (options: any = {}) => {
  return useGet<any>([queryKeys.districts], '/district', null, {
    keepPreviousData: true,
    ...options,
  });
};
