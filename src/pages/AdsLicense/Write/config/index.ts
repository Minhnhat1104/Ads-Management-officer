import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';
import { DEMO_OPTIONS } from 'src/constants/demo';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_REQUEST_WIDTH]: {
    languageKey: 'Chiều dài',
    Component: TextField,
    defaultValue: DEMO_OPTIONS[0],
    componentProps: {
      type: 'number',
      options: DEMO_OPTIONS,
      endAdornment: 'm',
    },
  },
  [keyNames.KEY_NAME_REQUEST_HEIGHT]: {
    languageKey: 'Chiều rộng',
    Component: TextField,
    defaultValue: false,
    componentProps: {
      type: 'number',
    },
  },
  [keyNames.KEY_NAME_REQUEST_IMAGE]: {
    languageKey: 'Hình ảnh',
    Component: baseComponents.ImageUpload,
    defaultValue: [],
    componentProps: {
      options: DEMO_OPTIONS,
      endAdornment: 'm',
    },
  },
  [keyNames.KEY_NAME_REQUEST_PLACEMENT]: {
    languageKey: 'Vị trí',
    Component: baseComponents.PlacementSelect,
    defaultValue: null,
    componentProps: {},
  },
  [keyNames.KEY_NAME_REQUEST_AMOUNT]: {
    languageKey: 'Số lượng',
    Component: TextField,
    defaultValue: 0,
    componentProps: {
      type: 'number',
    },
  },
  [keyNames.KEY_NAME_REQUEST_ADVERTISING_TYPE]: {
    languageKey: 'Loại quảng cáo',
    Component: TextField,
    defaultValue: null,
    componentProps: {},
  },
  [keyNames.KEY_NAME_REQUEST_COMPANY]: {
    languageKey: 'Công ty',
    Component: TextField,
    defaultValue: null,
    componentProps: {},
  },
  [keyNames.KEY_NAME_REQUEST_START_DATE]: {
    languageKey: 'Ngày bắt đầu',
    Component: baseComponents.DatePicker,
    defaultValue: null,
    componentProps: {},
  },
  [keyNames.KEY_NAME_REQUEST_END_DATE]: {
    languageKey: 'Ngày kết thúc',
    Component: baseComponents.DatePicker,
    defaultValue: null,
    componentProps: {},
  },
};

export default writeConfig;
