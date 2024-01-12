import { LabelValue } from '@base/types';
import * as keyNames from './config/keyNames';

export const finalizeParams = (params: any, updateData: any) => {
  let parsedParams: any = {};

  parsedParams = {
    districtId: params?.[keyNames.KEY_NAME_WARD_DISTRICT]?.value,
    wardName: params?.[keyNames.KEY_NAME_WARD_NAME],
  };

  if (updateData) {
    parsedParams.id = updateData?.id;
  }

  return parsedParams;
};
