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
    defaultValue: '',
    componentProps: {
      autoComplete: 'off',
    },
    validate: (value: any) => !!value || 'Hãy nhập mật khẩu cũ',
  },
  [keyNames.KEY_NAME_PASS_NEW]: {
    languageKey: 'Mật khẩu mới',
    Component: PasswordField,
    defaultValue: '',
    componentProps: {
      autoComplete: 'off',
    },
    validate: (value: any, allValues: any) => {
      const oldPass = allValues[keyNames.KEY_NAME_PASS_OLD];
      if (oldPass && value && value === oldPass) {
        return 'Mật khẩu mới phải khác mật khẩu cũ';
      }

      if (!value) {
        return 'Hãy nhập mật khẩu mới';
      }

      return true;
    },
  },
};

export default writeConfig;
