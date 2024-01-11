import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useAdsFormat = (options: any = {}) => {
  return useGet<any>([queryKeys.placementFormats], '/placements/format', null, {
    keepPreviousData: true,
    ...options,
  });
};
