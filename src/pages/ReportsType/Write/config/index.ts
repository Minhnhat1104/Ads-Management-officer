import { TextField } from '@mui/material';
import { WriteConfig } from '@base/types/common';
import * as keyNames from './keyNames';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_REPORTS_TYPE_NAME]: {
    languageKey: 'Tên Loại hình thức báo cáo',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập tên loại hình thức báo cáo',
  },
};

export default writeConfig;
