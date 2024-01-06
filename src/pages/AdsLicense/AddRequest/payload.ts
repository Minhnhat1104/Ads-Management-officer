import { LabelValue } from '@base/types';
import * as keyNames from './config/keyNames';

export const finalizeParams = (params: any) => {
  let parsedParams: any = {};

  parsedParams = {
    width: Number(params?.[keyNames.KEY_NAME_REQUEST_WIDTH]),
    height: Number(params?.[keyNames.KEY_NAME_REQUEST_HEIGHT]),
    // image: params?.[keyNames.KEY_NAME_REQUEST_IMAGE] ,
    placementId: params?.[keyNames.KEY_NAME_REQUEST_PLACEMENT]?.value,
    amount: Number(params?.[keyNames.KEY_NAME_REQUEST_AMOUNT]),
    advertisingTypeId: params?.[keyNames.KEY_NAME_REQUEST_ADVERTISING_TYPE]?.value,
    companyId: params?.[keyNames.KEY_NAME_REQUEST_COMPANY]?.value,
    startDate: params?.[keyNames.KEY_NAME_REQUEST_START_DATE],
    endDate: params?.[keyNames.KEY_NAME_REQUEST_END_DATE],
  };
  return parsedParams;
};
