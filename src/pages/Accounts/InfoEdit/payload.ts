import { LabelValue } from '@base/types';
import * as keyNames from './config/keyNames';

export const finalizeParams = (params: any, updateData: any) => {
  let parsedParams: any = {};

  parsedParams = {
    roleName: params?.[keyNames.KEY_NAME_ACCOUNT_ROLE]?.value,
    wardId: params?.[keyNames.KEY_NAME_ACCOUNT_WARD]?.value,
    id: updateData?.id,
  };
  return parsedParams;
};
