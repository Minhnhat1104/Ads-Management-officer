import { LabelValue } from '@base/types';
import * as keyNames from './config/keyNames';

export const finalizeParams = (params: any, updateData: any) => {
  let parsedParams: any = {};

  parsedParams = {
    editData: {
      firstName: params?.[keyNames.KEY_NAME_INFO_FIRSTNAME],
      lastName: params?.[keyNames.KEY_NAME_INFO_LASTNAME],
      email: params?.[keyNames.KEY_NAME_INFO_EMAIL],
      phone: params?.[keyNames.KEY_NAME_INFO_PHONE],
      dob: params?.[keyNames.KEY_NAME_INFO_DATE_OF_BIRTH],
      // wardId: params?.[keyNames.KEY_NAME_INFO_WARD_ID]?.value,
    },
    editItemId: updateData?.id,
  };
  return parsedParams;
};
