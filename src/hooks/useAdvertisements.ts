import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useAdvertisements = (params?: any, placementId?: string, opts?: any) => {
  return useGet<any>(
    [queryKeys.advertisements, placementId, keyStringify(params)],
    `advertisement/placement/${placementId}`,
    params,
    {
      keepPreviousData: true,
      ...opts,
    }
  );
};
