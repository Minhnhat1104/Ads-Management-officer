import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useAdvertisements = (params?: any, opts?: any) => {
  return useGet<any>([queryKeys.advertisements, keyStringify(params)], `advertisement`, null, {
    ...opts,
  });
};
