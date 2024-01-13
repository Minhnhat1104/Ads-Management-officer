import { TextField } from '@mui/material';
import { WriteConfig } from '@base/types/common';
import * as keyNames from './keyNames';
import * as components from 'src/components';
import * as baseComponents from '@base/config/WriteField/components';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_PLACEMENT_LOCATION_ADDRESSS]: {
    languageKey: 'Địa chỉ',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập Địa chỉ',
  },
  [keyNames.KEY_NAME_PLACEMENT_LOCATION_POSITION]: {
    languageKey: 'Vị trí',
    Component: components.MiniMapSelectPoint,
    defaultValue: {
      lng: 106.68246,
      lat: 10.7631,
    },
    componentProps: {},
    validate: (value: any) => (!!value?.lat && !!value?.lng) || 'Hãy chọn vị trí',
  },
  [keyNames.KEY_NAME_PLACEMENT_LOCATION_PLANNED]: {
    languageKey: 'Trạng thái quy hoạch',
    Component: baseComponents.CheckBox,
    defaultValue: false,
    componentProps: {},
  },
  [keyNames.KEY_NAME_PLACEMENT_LOCATION_TYPEID]: {
    languageKey: 'Loại điểm đặt quảng cáo',
    Component: components.LocationTypeSelect,
    defaultValue: '',
    componentProps: {},
  },
  [keyNames.KEY_NAME_PLACEMENT_LOCATION_FORMATID]: {
    languageKey: 'Hình thức quảng cáo',
    Component: components.FormatSelect,
    defaultValue: '',
    componentProps: {},
  },
  [keyNames.KEY_NAME_PLACEMENT_LOCATION_WARDID]: {
    languageKey: 'Phường, Quận',
    Component: components.WardSelect,
    defaultValue: null,
    componentProps: {},
  },
};

export default writeConfig;
