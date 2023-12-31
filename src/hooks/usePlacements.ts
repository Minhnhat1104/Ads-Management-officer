import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const usePlacements = (params?: any, options: any = {}) => {
  return useGet<any>([queryKeys.placements, keyStringify(params)], 'placements', params, {
    ...options,
  });
};
