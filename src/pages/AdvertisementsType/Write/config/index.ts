import { TextField } from '@mui/material';
import { WriteConfig } from '@base/types/common';
import * as keyNames from './keyNames';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_ADVERTISEMENT_TYPE_NAME]: {
    languageKey: 'Tên loại bảng quảng cáo',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập tên loại bảng quảng cáo',
  },
};

export default writeConfig;
