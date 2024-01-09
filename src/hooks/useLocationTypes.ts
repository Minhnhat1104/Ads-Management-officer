import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useLocationTypes = (options: any = {}) => {
  return useGet<any>([queryKeys.locationTypes], 'placements/location-type', null, {
    ...options,
  });
};
