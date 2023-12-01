import { TextField } from '@mui/material';

// import * as baseComponents from '@base/configs/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_LOGIN_USER_NAME]: {
    languageKey: 'Tên đăng nhập',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
  },
  [keyNames.KEY_NAME_LOGIN_PASSWORD]: {
    languageKey: 'Mật khẩu',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
  },
};

export default writeConfig;
