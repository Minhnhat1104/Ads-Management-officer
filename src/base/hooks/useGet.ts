import { useQuery, QueryOptions, UseQueryOptions } from '@tanstack/react-query';
import { isArray } from 'lodash';

import { axiosAPI } from '@base/utils/axios/api';
import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from '@base/store/atoms/accessTokenAtom';

export function useGet<T>(
  queryKey: any[],
  endPoint: string,
  payload?: any, // add optional for apis not required query params
  options?: UseQueryOptions<T>,
  header?: any,
  responseType?: string,
  customConfig?: any
) {
  const accessToken = useRecoilValue(accessTokenAtom);
  const key = isArray(queryKey) ? queryKey : [queryKey];
  const response = useQuery<T>(
    key,
    () => {
      return axiosAPI<T>(
        endPoint,
        'GET',
        payload,
        { ...header, Authoriztion: `Bearer ${accessToken}` },
        responseType,
        customConfig
      );
    },
    options
  );

  return response;
}

export default useGet;
