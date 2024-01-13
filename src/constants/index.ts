import { LabelValue } from '@base/types';

export const REQUEST_STATUS_OPTIONS: LabelValue<string, number>[] = [
  {
    label: 'Từ chối',
    value: -1,
    extra: 'error',
  },
  {
    label: 'Đang xem xét',
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
export const USER_ROLE_DISTRICT = 'DISTRICT';

export const USER_ROLE_OPTIONS: LabelValue[] = [
  {
    label: 'Cán bộ sở',
    value: USER_ROLE_DEPARTMENT,
  },
  {
    label: 'Cán bộ phường',
    value: USER_ROLE_WARD,
  },
  {
    label: 'Cán bộ quận',
    value: USER_ROLE_DISTRICT,
  },
];

export const REQUEST_EDIT_TYPE_OPTIONS: LabelValue[] = [
  {
    label: 'Điểm đặt',
    value: 'placement',
  },
  {
    label: 'Bảng quảng cáo',
    value: 'advertisement',
  },
];

export const REPORT_STATUS_OPTIONS: LabelValue<string, number>[] = [
  {
    label: 'Chưa xử lý',
    value: -1,
    extra: 'secondary',
  },
  {
    label: 'Đang xử lý',
    value: 0,
    extra: 'primary',
  },
  {
    label: 'Đã xử lý',
    value: 1,
    extra: 'success',
  },
];
