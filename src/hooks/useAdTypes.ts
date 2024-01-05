import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useAdTypes = (options: any = {}) => {
  return useGet<any>([queryKeys.adTypes], 'advertisement/type', null, {
    keepPreviousData: true,
    ...options,
  });
};
