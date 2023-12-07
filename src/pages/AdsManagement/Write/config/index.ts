import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';
import { DEMO_OPTIONS } from 'src/constants/demo';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_ADS_1]: {
    languageKey: 'Title 1',
    Component: baseComponents.RadioGroup,
    defaultValue: DEMO_OPTIONS[0],
    componentProps: {
      options: DEMO_OPTIONS,
    },
  },
  [keyNames.KEY_NAME_ADS_2]: {
    languageKey: 'Title 2',
    Component: baseComponents.CheckBox,
    defaultValue: false,
    componentProps: {
      label: 'Demo Label',
      sx: {
        ml: -1,
      },
    },
  },
  [keyNames.KEY_NAME_ADS_3]: {
    languageKey: 'Title 3',
    Component: baseComponents.CheckBoxGroup,
    defaultValue: [],
    componentProps: {
      options: DEMO_OPTIONS,
    },
  },
  [keyNames.KEY_NAME_ADS_4]: {
    languageKey: 'Title 4',
    Component: baseComponents.SelectBox,
    defaultValue: '',
    componentProps: {
      options: DEMO_OPTIONS,
    },
  },
  [keyNames.KEY_NAME_ADS_5]: {
    languageKey: 'Title 5',
    Component: baseComponents.QuillEditor,
    defaultValue: '',
    componentProps: {},
  },
};

export default writeConfig;
