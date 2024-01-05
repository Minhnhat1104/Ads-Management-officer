import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useRequest = (id?: any, options: any = {}) => {
  return useGet<any>([queryKeys.requestView, id], `requests/${id}`, null, {
    keepPreviousData: true,
    ...options,
  });
};
