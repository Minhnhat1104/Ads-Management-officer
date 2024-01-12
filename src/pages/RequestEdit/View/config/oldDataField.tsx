import { ViewFieldConfig } from '../ViewFields';

export const oldDataField: ViewFieldConfig[] = [
  {
    label: 'Địa chỉ',
    value: 'address',
  },
  {
    label: 'Kinh độ',
    value: 'lat',
  },
  {
    label: 'Vĩ độ',
    value: 'lng',
  },
  {
    label: 'Quy hoạch',
    value: 'planned',
    getValue(value, keyName) {
      return value === true ? 'Đã quy hoạch' : 'Chưa quy hoạch';
    },
  },
  {
    label: 'Điểm đặt quảng cáo',
    value: 'locationType',
    getValue(value, keyName) {
      return value.name;
    },
  },
  {
    label: 'Hình thức quảng cáo',
    value: 'format',
    getValue(value, keyName) {
      return value.name;
    },
  },
  {
    label: 'Vị trí',
    value: 'ward',
    getValue(value, keyName) {
      return value?.wardName + ', ' + value?.district.districtName;
    },
  },
];
