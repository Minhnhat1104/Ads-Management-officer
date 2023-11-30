import { TextField } from '@mui/material';

// import * as baseComponents from '@base/configs/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_ADS_NAME]: {
    languageKey: 'Title 1',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
  },
  [keyNames.KEY_NAME_ADS_RESPONSIBILITES]: {
    languageKey: 'Title 2',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
  },
  [keyNames.KEY_NAME_ADS_CATEGORY]: {
    languageKey: 'Title 3',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
  },
  [keyNames.KEY_NAME_ADS_RIGHT]: {
    languageKey: 'Title 4',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
  },
};

export default writeConfig;
