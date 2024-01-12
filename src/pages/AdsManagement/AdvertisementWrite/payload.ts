import { LabelValue } from '@base/types';
import * as keyNames from './config/keyNames';

export const finalizeParams = (params: any, updateData: any) => {
  let parsedParams: any = {};

  parsedParams = {
    editData: {
      width: params?.[keyNames.KEY_NAME_AD_WIDTH],
      height: params?.[keyNames.KEY_NAME_AD_HEIGHT],
      image: updateData?.image,
      placementId: updateData?.placement?.id,
      amount: params?.[keyNames.KEY_NAME_AD_AMOUNT],
      advertisingTypeId: params?.[keyNames.KEY_NAME_AD_ADVERTISING_TYPE_ID]?.value,
      companyId: params?.[keyNames.KEY_NAME_AD_COMPANY_ID]?.value,
      startDate: params?.[keyNames.KEY_NAME_AD_START_DATE],
      endDate: params?.[keyNames.KEY_NAME_AD_END_DATE],
    },
    editItemId: updateData?.id,
    editReason: params?.[keyNames.KEY_NAME_AD_EDIT_REASON] || '',
  };
  return parsedParams;
};
