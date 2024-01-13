import { TextField } from '@mui/material';
import { WriteConfig } from '@base/types/common';
import * as keyNames from './keyNames';
import * as components from 'src/components';
import * as baseComponents from '@base/config/WriteField/components';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_PLACEMENT_LOCATION_ADDRESSS]: {
    languageKey: 'Vị trí điểm đặt quảng cáo',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập vị trí điểm đặt quảng cáo',
  },
  [keyNames.KEY_NAME_PLACEMENT_LOCATION_LAT]: {
    languageKey: 'Vĩ độ',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập vĩ độ',
  },
  [keyNames.KEY_NAME_PLACEMENT_LOCATION_LONG]: {
    languageKey: 'Tung độ',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập tung độ',
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
