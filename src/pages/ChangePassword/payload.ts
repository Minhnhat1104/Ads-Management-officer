import { LabelValue } from '@base/types';
import * as keyNames from './config/keyNames';

export const finalizeParams = (params: any) => {
  let parsedParams: any = {};

  parsedParams = {
    editData: {
      oldPassword: params?.[keyNames.KEY_NAME_PASS_OLD],
      newPassword: params?.[keyNames.KEY_NAME_PASS_NEW],
    },
  };
  return parsedParams;
};
