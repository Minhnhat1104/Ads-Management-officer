import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const usePlacements = (params?: any, options: any = {}) => {
  return useGet<any>([queryKeys.placements, keyStringify(params)], 'placements', params, {
    keepPreviousData: true,
    ...options,
  });
};

export const usePlacement = (id: string, options: any = {}) => {
  return useGet<any>([queryKeys.placementView, id], `placements/detail/${id}`, null, {
    keepPreviousData: true,
    ...options,
  });
};
