import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';
import { DEMO_OPTIONS } from 'src/constants/demo';

import * as components from 'src/components';
import { USER_ROLE_OPTIONS } from 'src/constants';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_ACCOUNT_FIRST_NAME]: {
    languageKey: 'Tên',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập tên Tên',
  },
  [keyNames.KEY_NAME_ACCOUNT_LAST_NAME]: {
    languageKey: 'Họ',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập tên Họ',
  },
  [keyNames.KEY_NAME_ACCOUNT_EMAIL]: {
    languageKey: 'Email',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập tên Email',
  },
  [keyNames.KEY_NAME_ACCOUNT_PHONE]: {
    languageKey: 'SĐT',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập tên SĐT',
  },
  [keyNames.KEY_NAME_ACCOUNT_PASSWORD]: {
    languageKey: 'Mật khẩu',
    Component: TextField,
    defaultValue: '',
    componentProps: {
      type: 'password',
    },
    validate: (value: any) => !!value || 'Hãy nhập tên Mật',
  },
  [keyNames.KEY_NAME_ACCOUNT_ROLE_NAME]: {
    languageKey: 'Vai trò',
    Component: baseComponents.SelectBox,
    defaultValue: null,
    componentProps: {
      options: USER_ROLE_OPTIONS,
    },
    validate: (value: any) => !!value || 'Hãy nhập tên Vai',
  },
  [keyNames.KEY_NAME_ACCOUNT_WARD]: {
    languageKey: 'Phường',
    Component: components.WardSelect,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập tên Phường',
  },
};

export default writeConfig;
