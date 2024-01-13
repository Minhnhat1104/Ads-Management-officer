import { LabelValue } from '@base/types';
import * as keyNames from './config/keyNames';

export const finalizeParams = (params: any, updateData: any) => {
  let parsedParams: any = {};

  parsedParams = {
    editData: {
      lat: Number(params?.[keyNames.KEY_NAME_PLACEMENT_LAT]),
      lng: Number(params?.[keyNames.KEY_NAME_PLACEMENT_LNG]),
      planned: params?.[keyNames.KEY_NAME_PLACEMENT_PLANNED],
      locationTypeId: params?.[keyNames.KEY_NAME_PLACEMENT_LOCATION_TYPE_ID]?.value,
      formatId: params?.[keyNames.KEY_NAME_PLACEMENT_FORMAT_ID]?.value,
      address: params?.[keyNames.KEY_NAME_PLACEMENT_ADDRESS]?.value,
      wardId: params?.[keyNames.KEY_NAME_PLACEMENT_WARD_ID]?.value,
    },
    editItemId: updateData?.id,
    editReason: params?.[keyNames.KEY_NAME_PLACEMENT_REASON] || '',
  };
  return parsedParams;
};
