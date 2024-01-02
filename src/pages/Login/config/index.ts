import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';

// import * as baseComponents from '@base/configs/WriteField/components';
import { WriteConfig, WriteFieldItem } from '@base/types/common';

import * as keyNames from './keyNames';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_LOGIN_USER_NAME]: {
    languageKey: 'Email',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || 'Vui lòng nhập một địa chỉ email hợp lệ';
    },
  },
  [keyNames.KEY_NAME_LOGIN_PASSWORD]: {
    languageKey: 'Mật khẩu',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => !!value || 'Vui lòng nhập mật khẩu',
  },
};

export default writeConfig;
