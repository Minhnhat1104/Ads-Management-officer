import { ViewFieldConfig } from '../ViewFields';

export const newDataField: ViewFieldConfig[] = [
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
  },
  {
    label: 'Hình thức quảng cáo',
    value: 'format',
  },
  {
    label: 'Vị trí',
    value: 'ward',
    getValue(value, keyName) {
      return value?.wardName + ', ' + value?.district.districtName;
    },
  },
];
