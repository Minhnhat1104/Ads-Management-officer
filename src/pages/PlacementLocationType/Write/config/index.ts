import { TextField } from '@mui/material';
import { WriteConfig } from '@base/types/common';
import * as keyNames from './keyNames';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_PLACEMENT_LOCATION_TYPE_NAME]: {
    languageKey: 'Tên loại điểm đặt quảng cáo',
    Component: TextField,
    defaultValue: '',
    componentProps: {},
    validate: (value: any) => !!value || 'Hãy nhập tên loại điểm đặt quảng cáo',
  },
};

export default writeConfig;
