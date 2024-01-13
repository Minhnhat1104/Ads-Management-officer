import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';
import { DEMO_OPTIONS } from 'src/constants/demo';

import * as components from 'src/components';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_PLACEMENT_LAT]: {
    languageKey: 'Tung độ',
    Component: TextField,
    defaultValue: 0,
    componentProps: {
      type: 'number',
    },
  },
  [keyNames.KEY_NAME_PLACEMENT_LNG]: {
    languageKey: 'Vĩ độ',
    Component: TextField,
    defaultValue: 0,
    componentProps: {
      type: 'number',
    },
  },
  [keyNames.KEY_NAME_PLACEMENT_PLANNED]: {
    languageKey: 'Trạng thái quy hoạch',
    Component: baseComponents.CheckBox,
    defaultValue: false,
    componentProps: {},
  },
  [keyNames.KEY_NAME_PLACEMENT_LOCATION_TYPE_ID]: {
    languageKey: 'Loại điểm đặt',
    Component: components.LocationTypeSelect,
    defaultValue: null,
    componentProps: {
      options: DEMO_OPTIONS,
    },
  },
  [keyNames.KEY_NAME_PLACEMENT_FORMAT_ID]: {
    languageKey: 'Loại bảng quảng cáo',
    Component: components.PlacementFormatSelect,
    defaultValue: null,
    componentProps: {},
  },
  [keyNames.KEY_NAME_PLACEMENT_ADDRESS]: {
    languageKey: 'Địa chỉ',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
  },
  [keyNames.KEY_NAME_PLACEMENT_WARD_ID]: {
    languageKey: 'Phường',
    Component: components.WardSelect,
    defaultValue: null,
    componentProps: {},
  },
  [keyNames.KEY_NAME_PLACEMENT_REASON]: {
    languageKey: 'Lí do chỉnh sửa',
    Component: baseComponents.QuillEditor,
    defaultValue: '',
    componentProps: {},
  },
};

export default writeConfig;
