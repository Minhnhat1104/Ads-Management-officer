import { LabelValue } from '@base/types';
import * as keyNames from './config/keyNames';

export const finalizeParams = (params: any) => {
  let parsedParams: any = {};

  parsedParams = {
    state: params?.[keyNames.KEY_NAME_REQUEST_STATUS]?.value,
    solution: params?.[keyNames.KEY_NAME_REQUEST_SOLUTION],
  };
  return parsedParams;
};
