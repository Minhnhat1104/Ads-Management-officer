import { LabelValue } from '@base/types';
import * as keyNames from './config/keyNames';

export const finalizeParams = (params: any) => {
  let parsedParams: any = {};

  parsedParams = {
    name: params?.[keyNames.KEY_NAME_ADDCOMPANY_NAME],
    email: params?.[keyNames.KEY_NAME_ADDCOMPANY_EMAIL],
    phone: params?.[keyNames.KEY_NAME_ADDCOMPANY_PHONE],
    address: params?.[keyNames.KEY_NAME_ADDCOMPANY_ADDRESS],
  };
  return parsedParams;
};
