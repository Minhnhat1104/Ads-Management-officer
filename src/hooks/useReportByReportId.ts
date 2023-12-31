import { queryKeys } from '@base/config/queryKeys';
import useGet from '@base/hooks/useGet';
import { keyStringify } from '@base/utils/helpers/schema';

export const useReportByReportId = (id?: string, options: any = {}) => {
  return useGet<any>([queryKeys.reportViewByReportId, id], `reports/${id}`, null, {
    ...options,
  });
};
