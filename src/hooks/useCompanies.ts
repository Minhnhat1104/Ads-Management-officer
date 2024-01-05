import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useCompanies = (options: any = {}) => {
  return useGet<any>([queryKeys.companies], 'company', null, {
    ...options,
  });
};
