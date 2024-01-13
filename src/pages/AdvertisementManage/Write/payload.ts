import { LabelValue } from '@base/types';
import * as keyNames from './config/keyNames';

export const finalizeParams = (params: any, updateData: any) => {
  let parsedParams: any = {};

  parsedParams = {
    width: Number(params?.[keyNames.KEY_NAME_AD_WIDTH]),
    height: Number(params?.[keyNames.KEY_NAME_AD_HEIGH]),
    // image: params?.[keyNames.KEY_NAME_AD_IMAGE],
    placementId: params?.[keyNames.KEY_NAME_AD_PLACEMENT_ID]?.value,
    amount: Number(params?.[keyNames.KEY_NAME_AD_AMOUNT]),
    advertisingTypeId: params?.[keyNames.KEY_NAME_AD_ADVERTISING_TYPE]?.value,
    companyId: params?.[keyNames.KEY_NAME_AD_COMPANY]?.value,
    startDate: params?.[keyNames.KEY_NAME_AD_START_DATE],
    endDate: params?.[keyNames.KEY_NAME_AD_END_DATE],
  };

  if (updateData) {
    parsedParams.id = updateData?.id;
  }

  return parsedParams;
};
