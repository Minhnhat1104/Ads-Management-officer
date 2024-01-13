import { LabelValue } from '@base/types';
import * as keyNames from './config/keyNames';

export const finalizeParams = (params: any, updateData: any) => {
  let parsedParams: any = {};

  parsedParams = {
    editData: {
      lat: Number(params?.[keyNames.KEY_NAME_PLACEMENT_LOCATION_LAT]),
      lng: Number(params?.[keyNames.KEY_NAME_PLACEMENT_LOCATION_LONG]),
      planned: params?.[keyNames.KEY_NAME_PLACEMENT_LOCATION_PLANNED],
      locationTypeId: params?.[keyNames.KEY_NAME_PLACEMENT_LOCATION_TYPEID]?.value,
      formatId: params?.[keyNames.KEY_NAME_PLACEMENT_LOCATION_FORMATID]?.value,
      address: params?.[keyNames.KEY_NAME_PLACEMENT_LOCATION_ADDRESSS],
      wardId: params?.[keyNames.KEY_NAME_PLACEMENT_LOCATION_WARDID]?.value,
    },
    editItemId: updateData?.id,
  };
  if (updateData) {
    parsedParams.editData.id = updateData?.id;
  }
  return parsedParams;
};
