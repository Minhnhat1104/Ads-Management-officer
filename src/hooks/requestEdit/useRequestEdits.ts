import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useRequestEdits = (params: any, options: any = {}) => {
  return useGet<any>([queryKeys.requestEdits], 'requests/edit/all', params, {
    keepPreviousData: true,
    ...options,
  });
};
