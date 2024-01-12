import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';
import { DEMO_OPTIONS } from 'src/constants/demo';

import * as components from 'src/components';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_AD_WIDTH]: {
    languageKey: 'Chiều dài',
    Component: TextField,
    defaultValue: 0,
    componentProps: {
      type: 'number',
    },
  },
  [keyNames.KEY_NAME_AD_HEIGHT]: {
    languageKey: 'Chiều rộng',
    Component: TextField,
    defaultValue: 0,
    componentProps: {
      type: 'number',
    },
  },
  [keyNames.KEY_NAME_AD_IMAGE]: {
    languageKey: 'Hình ảnh',
    Component: baseComponents.ImageUpload,
    defaultValue: false,
    componentProps: {},
  },
  [keyNames.KEY_NAME_AD_PLACEMENT_ID]: {
    languageKey: 'Điểm đặt',
    Component: components.MiniMap,
    defaultValue: null,
    componentProps: {},
  },
  [keyNames.KEY_NAME_AD_AMOUNT]: {
    languageKey: 'Số lượng',
    Component: TextField,
    defaultValue: 0,
    componentProps: {
      type: 'number',
    },
  },
  [keyNames.KEY_NAME_AD_ADVERTISING_TYPE_ID]: {
    languageKey: 'Loại quảng cáo',
    Component: baseComponents.AdTypeSelect,
    defaultValue: null,
    componentProps: {},
  },
  [keyNames.KEY_NAME_AD_COMPANY_ID]: {
    languageKey: 'Công ty',
    Component: baseComponents.CompanySelect,
    defaultValue: '',
    componentProps: {},
  },
  [keyNames.KEY_NAME_AD_START_DATE]: {
    languageKey: 'Ngày bắt đầu',
    Component: baseComponents.DatePicker,
    defaultValue: null,
    componentProps: {},
  },
  [keyNames.KEY_NAME_AD_END_DATE]: {
    languageKey: 'Ngày kết thúc',
    Component: baseComponents.DatePicker,
    defaultValue: null,
    componentProps: {},
  },
  [keyNames.KEY_NAME_AD_EDIT_REASON]: {
    languageKey: 'Lý do chỉnh sửa',
    Component: baseComponents.QuillEditor,
    defaultValue: '',
    componentProps: {},
  },
};

export default writeConfig;
