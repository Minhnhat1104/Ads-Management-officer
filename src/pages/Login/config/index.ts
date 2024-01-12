import { TextField } from '@mui/material';

// import * as baseComponents from '@base/configs/WriteField/components';
import { WriteConfig, WriteFieldItem } from '@base/types/common';

import * as keyNames from './keyNames';
import PasswordField from '@base/components/PasswordField';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_LOGIN_USER_NAME]: {
    languageKey: 'Email',
    Component: TextField,
    componentProps: {
      autoComplete: 'off',
    },
    defaultValue: '',
    validate: (value: any) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || 'Vui lòng nhập một địa chỉ email hợp lệ';
    },
  },
  [keyNames.KEY_NAME_LOGIN_PASSWORD]: {
    languageKey: 'Mật khẩu',
    Component: PasswordField,
    defaultValue: '',
    componentProps: {
      autoComplete: 'off',
    },
    validate: (value: any) => !!value || 'Vui lòng nhập mật khẩu',
  },
};

export default writeConfig;
