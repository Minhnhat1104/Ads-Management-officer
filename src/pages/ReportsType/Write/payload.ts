import { LabelValue } from '@base/types';
import * as keyNames from './config/keyNames';

export const finalizeParams = (params: any, updateData: any) => {
  let parsedParams: any = {};

  parsedParams = {
    ...params,
  };

  if (updateData) {
    parsedParams.id = updateData?.id;
  }
  return parsedParams;
};
