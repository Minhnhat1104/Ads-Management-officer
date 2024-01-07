import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';
import { DEMO_OPTIONS } from 'src/constants/demo';
import Button from '@base/themes/overrides/Button';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_REQUEST_WIDTH]: {
    languageKey: 'Chiều dài (m)',
    Component: TextField,
    defaultValue: 0,
    componentProps: {
      type: 'number',
      endAdornment: 'm',
    },
    validate: (value: any) => (!!value && value !== '0') || 'Hãy nhập chiều dài và chiều dài phải lớn hơn 0',
  },
  [keyNames.KEY_NAME_REQUEST_HEIGHT]: {
    languageKey: 'Chiều rộng (m)',
    Component: TextField,
    defaultValue: 0,
    componentProps: {
      type: 'number',
    },
    validate: (value: any) => (!!value && value !== '0') || 'Hãy nhập chiều rộng và chiều rộng phải lớn hơn 0',
  },
  [keyNames.KEY_NAME_REQUEST_IMAGE]: {
    languageKey: 'Hình ảnh',
    Component: baseComponents.ImageUpload,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => !!value?.[0] || 'Hãy thêm hình ảnh',
  },
  [keyNames.KEY_NAME_REQUEST_PLACEMENT]: {
    languageKey: 'Vị trí',
    Component: baseComponents.PlacementSelect,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy chọn vị trí',
  },
  [keyNames.KEY_NAME_REQUEST_AMOUNT]: {
    languageKey: 'Số lượng',
    Component: TextField,
    defaultValue: 0,
    componentProps: {
      type: 'number',
    },
    validate: (value: any) => !!value || 'Hãy nhập số lượng',
  },
  [keyNames.KEY_NAME_REQUEST_ADVERTISING_TYPE]: {
    languageKey: 'Loại quảng cáo',
    Component: baseComponents.AdTypeSelect,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy chọn loại quảng cáo',
  },
  [keyNames.KEY_NAME_REQUEST_COMPANY]: {
    languageKey: 'Công ty',
    Component: baseComponents.CompanySelect,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy chọn công ty',
  },
  [keyNames.KEY_NAME_REQUEST_START_DATE]: {
    languageKey: 'Ngày bắt đầu',
    Component: baseComponents.DatePicker,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy chọn ngày bắt đầu',
  },
  [keyNames.KEY_NAME_REQUEST_END_DATE]: {
    languageKey: 'Ngày kết thúc',
    Component: baseComponents.DatePicker,
    defaultValue: null,
    componentProps: {},
    validate: (value: any, allValues: any) => {
      const startDate = allValues[keyNames.KEY_NAME_REQUEST_START_DATE];
      return (startDate && value && value > startDate) || 'Ngày kết thúc phải lớn hơn ngày bắt đầu';
    },
  },
};

export default writeConfig;
