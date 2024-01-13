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
    validate: (value: any) => !!value || 'Hãy nhập Chiều dài',
  },
  [keyNames.KEY_NAME_AD_HEIGH]: {
    languageKey: 'Chiều rộng',
    Component: TextField,
    defaultValue: 0,
    componentProps: {
      type: 'number',
    },
    validate: (value: any) => !!value || 'Hãy nhập Chiều rộng',
  },
  [keyNames.KEY_NAME_AD_IMAGE]: {
    languageKey: 'Hình ảnh',
    Component: baseComponents.ImageUpload,
    defaultValue: null,
    componentProps: {},
    // validate: (value: any) => !!value || 'Hãy nhập Hình ảnh',
  },
  [keyNames.KEY_NAME_AD_PLACEMENT_ID]: {
    languageKey: 'Điểm đặt',
    Component: baseComponents.PlacementSelect,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập Điểm đặt',
  },
  [keyNames.KEY_NAME_AD_AMOUNT]: {
    languageKey: 'Số lượng',
    Component: TextField,
    defaultValue: 0,
    componentProps: {
      type: 'number',
    },
    validate: (value: any) => !!value || 'Hãy nhập Số lượng',
  },
  [keyNames.KEY_NAME_AD_ADVERTISING_TYPE]: {
    languageKey: 'Loại QC',
    Component: baseComponents.AdTypeSelect,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập Loại QC',
  },
  [keyNames.KEY_NAME_AD_COMPANY]: {
    languageKey: 'Công ty',
    Component: baseComponents.CompanySelect,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập Công ty',
  },
  [keyNames.KEY_NAME_AD_START_DATE]: {
    languageKey: 'Ngày bắt đầu',
    Component: baseComponents.DatePicker,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập Ngày bắt đầu',
  },
  [keyNames.KEY_NAME_AD_END_DATE]: {
    languageKey: 'Ngày kết thúc',
    Component: baseComponents.DatePicker,
    defaultValue: null,
    componentProps: {},
    validate: (value: any, allValues: any) => {
      // Validate that end date is greater than start date
      const startDate = allValues[keyNames.KEY_NAME_AD_START_DATE];
      if (startDate && value <= startDate) {
        return 'Ngày kết thúc phải lớn hơn Ngày bắt đầu';
      }

      return !!value || 'Hãy nhập Ngày kết thúc';
    },
  },
};

export default writeConfig;
