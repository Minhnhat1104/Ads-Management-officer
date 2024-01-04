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
