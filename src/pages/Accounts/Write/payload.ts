import { LabelValue } from '@base/types';
import * as keyNames from './config/keyNames';

export const finalizeParams = (params: any, updateData: any) => {
  let parsedParams: any = {};

  parsedParams = {
    firstName: params?.[keyNames.KEY_NAME_ACCOUNT_FIRST_NAME],
    lastName: params?.[keyNames.KEY_NAME_ACCOUNT_LAST_NAME],
    email: params?.[keyNames.KEY_NAME_ACCOUNT_EMAIL],
    phone: params?.[keyNames.KEY_NAME_ACCOUNT_PHONE],
    password: params?.[keyNames.KEY_NAME_ACCOUNT_PASSWORD],
    roleName: params?.[keyNames.KEY_NAME_ACCOUNT_ROLE_NAME]?.value,
    wardId: params?.[keyNames.KEY_NAME_ACCOUNT_WARD]?.value,
  };
  return parsedParams;
};
