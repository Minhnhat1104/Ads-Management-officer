import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';
import { DEMO_OPTIONS } from 'src/constants/demo';

import * as components from 'src/components';
import { USER_ROLE_OPTIONS } from 'src/constants';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_ACCOUNT_ROLE]: {
    languageKey: 'Vai trò',
    Component: baseComponents.SelectBox,
    defaultValue: null,
    componentProps: {
      options: USER_ROLE_OPTIONS,
    },
    validate: (value: any) => !!value || 'Hãy chọn vai trò',
  },
  [keyNames.KEY_NAME_ACCOUNT_WARD]: {
    languageKey: 'Phường',
    Component: components.WardSelect,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy chọn phường',
  },
};

export default writeConfig;
