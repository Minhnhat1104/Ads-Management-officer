import { LabelValue } from '@base/types';

export const REQUEST_STATUS_OPTIONS: LabelValue<string, number>[] = [
  {
    label: 'Từ chối',
    value: -1,
    extra: 'error',
  },
  {
    label: 'Đang xử lí',
    value: 0,
    extra: 'secondary',
  },
  {
    label: 'Chấp nhận',
    value: 1,
    extra: 'success',
  },
];

export const USER_ROLE_DEPARTMENT = 'DEPARTMENT';
export const USER_ROLE_WARD = 'WARD';

export const USER_ROLE_OPTIONS: LabelValue[] = [
  {
    label: 'Cán bộ sở',
    value: USER_ROLE_DEPARTMENT,
  },
  {
    label: 'Cán bộ phường',
    value: USER_ROLE_WARD,
  },
];
