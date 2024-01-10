import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';
import { DEMO_OPTIONS } from 'src/constants/demo';

import * as components from 'src/components';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_WARD_DISTRICT]: {
    languageKey: 'Quận',
    Component: components.DistrictSelect,
    defaultValue: null,
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập tên quận',
  },
  [keyNames.KEY_NAME_WARD_NAME]: {
    languageKey: 'Tên Phường',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập tên quận',
  },
};

export default writeConfig;
