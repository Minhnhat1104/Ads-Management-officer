import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';
import { DEMO_OPTIONS } from 'src/constants/demo';

import * as components from 'src/components';
import PasswordField from '@base/components/PasswordField';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_PASS_OLD]: {
    languageKey: 'Mật khẩu cũ',
    Component: PasswordField,
    validate: (value: any) => !!value || 'Hãy nhập mật khẩu cũ',
  },
  [keyNames.KEY_NAME_PASS_NEW]: {
    languageKey: 'Mật khẩu mới',
    Component: PasswordField,
    validate: (value: any, allValues: any) => {
      const oldPass = allValues[keyNames.KEY_NAME_PASS_OLD];
      return (oldPass && value && value !== oldPass) || 'Mật khẩu mới phải khác mật khẩu cũ';
    },
  },
};

export default writeConfig;
