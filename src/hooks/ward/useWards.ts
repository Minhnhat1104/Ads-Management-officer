import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useWards = (options: any = {}) => {
  return useGet<any>([queryKeys.wards], 'ward', null, {
    ...options,
  });
};
