import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const usePlacement = (id: string, opts?: any) => {
  return useGet<any>([queryKeys.placementView, id], `advertisement/placement${id}`, null, {
    ...opts,
  });
};
