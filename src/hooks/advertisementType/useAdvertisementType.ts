import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useAdvertisementType = (options: any = {}) => {
  return useGet<any>([queryKeys.advertisementsType], '/advertisement/type', null, {
    keepPreviousData: true,
    ...options,
  });
};
