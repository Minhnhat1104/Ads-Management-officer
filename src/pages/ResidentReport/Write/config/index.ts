import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';

import * as components from 'src/components';
import { REPORT_STATUS_OPTIONS } from 'src/constants';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_REQUEST_STATUS]: {
    languageKey: 'Trạng thái',
    Component: baseComponents.SelectBox,
    defaultValue: null,
    componentProps: {
      options: REPORT_STATUS_OPTIONS,
    },
    validate: (value: any) => !!value || 'Hãy nhập trạng thái',
  },
  [keyNames.KEY_NAME_REQUEST_SOLUTION]: {
    languageKey: 'Giải pháp',
    Component: baseComponents.QuillEditor,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập giải pháp',
  },
};

export default writeConfig;
