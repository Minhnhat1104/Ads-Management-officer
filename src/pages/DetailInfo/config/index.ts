import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';
import { DEMO_OPTIONS } from 'src/constants/demo';

import * as components from 'src/components';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_INFO_FIRSTNAME]: {
    languageKey: 'Tên',
    Component: TextField,
    defaultValue: '',
    validate: (value: any) => !!value || 'Hãy nhập Tên',
  },
  [keyNames.KEY_NAME_INFO_LASTNAME]: {
    languageKey: 'Họ',
    Component: TextField,
    defaultValue: '',
    validate: (value: any) => !!value || 'Hãy nhập Họ',
  },
  [keyNames.KEY_NAME_INFO_EMAIL]: {
    languageKey: 'Email',
    Component: TextField,
    defaultValue: '',
    validate: (value: any) => !!value || 'Hãy nhập Email',
  },
  [keyNames.KEY_NAME_INFO_PHONE]: {
    languageKey: 'Số điện thoại',
    Component: TextField,
    defaultValue: '',
    validate: (value: string) => {
      const pattern = new RegExp(/^\d{1,10}$/);
      return pattern.test(value);
    },
  },
  [keyNames.KEY_NAME_INFO_DATE_OF_BIRTH]: {
    languageKey: 'Ngày sinh',
    Component: baseComponents.DatePicker,
    defaultValue: null,
    validate: (value: any) => !!value || 'Hãy nhập Ngày sinh',
  },
  [keyNames.KEY_NAME_INFO_WARD_ID]: {
    languageKey: 'Khu vực quản lý',
    Component: components.WardSelect,
    defaultValue: null,
    componentProps: {},
  },
};

export default writeConfig;
