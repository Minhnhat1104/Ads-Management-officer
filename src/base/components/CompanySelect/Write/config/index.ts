import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';
import { DEMO_OPTIONS } from 'src/constants/demo';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_ADDCOMPANY_NAME]: {
    languageKey: 'Tên công ty',
    Component: TextField,
    componentProps: {
      type: 'string',
      endAdornment: 'm',
    },
    validate: (value: any) => !!value || 'Hãy nhập tên công ty',
  },
  [keyNames.KEY_NAME_ADDCOMPANY_EMAIL]: {
    languageKey: 'Email',
    Component: TextField,
    componentProps: {
      type: 'string',
      endAdornment: 'm',
    },
    validate: (value: any) => !!value || 'Hãy nhập email',
  },
  [keyNames.KEY_NAME_ADDCOMPANY_PHONE]: {
    languageKey: 'Số điện thoại',
    Component: TextField,
    componentProps: {
      type: 'string',
      endAdornment: 'm',
    },
    validate: (value: any) => !!value || 'Hãy nhập số điện thoại',
  },
  [keyNames.KEY_NAME_ADDCOMPANY_ADDRESS]: {
    languageKey: 'Địa chỉ',
    Component: TextField,
    componentProps: {
      type: 'string',
      endAdornment: 'm',
    },
    validate: (value: any) => !!value || 'Hãy nhập địa chỉ',
  },
};

export default writeConfig;
