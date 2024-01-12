import { ViewFieldConfig } from '../ViewFields';

export const newDataFieldPlacement: ViewFieldConfig[] = [
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
      return value?.[keyName] === true ? 'Đã quy hoạch' : 'Chưa quy hoạch';
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
      return value?.[keyName]?.wardName + ', ' + value?.[keyName]?.district?.districtName;
    },
  },
];

export const newDataFieldAdvertisement: ViewFieldConfig[] = [
  {
    label: 'Chiều dài',
    value: 'width',
  },
  {
    label: 'Chiều cao',
    value: 'height',
  },
  {
    label: 'Quy hoạch',
    value: 'planned',
    getValue(value, keyName) {
      return value?.placement?.[keyName] === true ? 'Đã quy hoạch' : 'Chưa quy hoạch';
    },
  },
  {
    label: 'Địa chỉ',
    value: 'address',
    getValue(value, keyName) {
      return value?.placement?.[keyName];
    },
  },
  {
    label: 'Phường',
    value: 'ward',
    getValue(value, keyName) {
      return value?.placement?.[keyName]?.wardName;
    },
  },
  {
    label: 'Quận',
    value: 'ward',
    getValue(value, keyName) {
      return value?.placement?.[keyName]?.district?.districtName;
    },
  },
  {
    label: 'Loại điểm đặt',
    value: 'locationType',
    getValue(value, keyName) {
      return value?.placement?.[keyName]?.name;
    },
  },
  {
    label: 'Hình thức quảng cáo',
    value: 'format',
    getValue(value, keyName) {
      return value?.placement?.[keyName]?.name;
    },
  },
  {
    label: 'Số lượng',
    value: 'amount',
  },
  {
    label: 'Loại bảng quảng cáo',
    value: 'advertisingType',
  },
  {
    label: 'Tên công ty',
    value: 'name',
    getValue(value, keyName) {
      return value?.company?.[keyName];
    },
  },
  {
    label: 'Email công ty',
    value: 'email',
    getValue(value, keyName) {
      return value?.company?.[keyName];
    },
  },
  {
    label: 'Số điện thoại công ty',
    value: 'phone',
    getValue(value, keyName) {
      return value?.company?.[keyName];
    },
  },
  {
    label: 'Địa chỉ công ty',
    value: 'address',
    getValue(value, keyName) {
      return value?.company?.[keyName];
    },
  },
];
