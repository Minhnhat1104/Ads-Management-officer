import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { isArray } from 'lodash';

import { axiosAPI, CustomAxiosConfigType } from '@base/utils/axios/api';

export function useMutationPost<T, E extends {} = {}, V extends {} = {}>(
  queryKey: any[],
  endPoint: string,
  options?: UseMutationOptions<T, E, V>,
  header?: any,
  responseType?: string,
  customConfig?: any,
  useInterceptors?: boolean
) {
  const key = isArray(queryKey) ? queryKey[0] : queryKey;
  const response = useMutation<T, E, V>(
    [key],
    (payload: V) => {
      return axiosAPI<T>(endPoint, 'POST', payload, header, responseType, customConfig, useInterceptors);
    },
    options
  );

  return response;
}

export default useMutationPost;
