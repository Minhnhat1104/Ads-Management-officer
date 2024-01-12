import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useRequestEditById = (id?: string, options: any = {}) => {
  return useGet<any>([queryKeys.requestEditById, id], `requests/edit/${id}`, null, {
    ...options,
  });
};
