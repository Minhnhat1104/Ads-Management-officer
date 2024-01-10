import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const usePlacementLocationType = (options: any = {}) => {
  return useGet<any>([queryKeys.placementLocationType], '/placements/location-type', null, {
    keepPreviousData: true,
    ...options,
  });
};
