import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';
import { DEMO_OPTIONS } from 'src/constants/demo';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_REQUEST_WIDTH]: {
    languageKey: 'Chiều dài',
    Component: TextField,
    defaultValue: 0,
    componentProps: {
      type: 'number',
      endAdornment: 'm',
    },
    validate: (value: any) => value || 'Hãy nhập chiều dài',
  },
  [keyNames.KEY_NAME_REQUEST_HEIGHT]: {
    languageKey: 'Chiều rộng',
    Component: TextField,
    defaultValue: 0,
    componentProps: {
      type: 'number',
    },
    validate: (value: any) => value || 'Hãy nhập chiều rộng',
  },
  [keyNames.KEY_NAME_REQUEST_IMAGE]: {
    languageKey: 'Hình ảnh',
    Component: baseComponents.ImageUpload,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => value || 'Hãy thêm hình ảnh',
  },
  [keyNames.KEY_NAME_REQUEST_PLACEMENT]: {
    languageKey: 'Vị trí',
    Component: baseComponents.PlacementSelect,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => value || 'Hãy chọn vị trí',
  },
  [keyNames.KEY_NAME_REQUEST_AMOUNT]: {
    languageKey: 'Số lượng',
    Component: TextField,
    defaultValue: 0,
    componentProps: {
      type: 'number',
    },
    validate: (value: any) => value || 'Hãy nhập số lượng',
  },
  [keyNames.KEY_NAME_REQUEST_ADVERTISING_TYPE]: {
    languageKey: 'Loại quảng cáo',
    Component: baseComponents.AdTypeSelect,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => value || 'Hãy chọn loại quảng cáo',
  },
  [keyNames.KEY_NAME_REQUEST_COMPANY]: {
    languageKey: 'Công ty',
    Component: baseComponents.CompanySelect,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => value || 'Hãy chọn công ty',
  },
  [keyNames.KEY_NAME_REQUEST_START_DATE]: {
    languageKey: 'Ngày bắt đầu',
    Component: baseComponents.DatePicker,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => value || 'Hãy chọn ngày bắt đầu',
  },
  [keyNames.KEY_NAME_REQUEST_END_DATE]: {
    languageKey: 'Ngày kết thúc',
    Component: baseComponents.DatePicker,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => value || 'Hãy nhập ngày kết thúc',
  },
};

export default writeConfig;
