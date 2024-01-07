import { ViewFieldConfig } from '../ViewFields';

export const approverField: ViewFieldConfig[] = [
  {
    label: 'Họ',
    value: 'lastName',
  },
  {
    label: 'Tên',
    value: 'firstName',
  },
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'SĐT',
    value: 'phone',
  },
  {
    label: 'Vai trò',
    value: 'roleName',
    getValue(value, keyName) {
      return value?.roleName === 'WARD' ? 'Cán bộ phường' : 'Cán bộ sở';
    },
  },
  {
    label: 'Phường',
    value: 'ward',
  },
  {
    label: 'Quận',
    value: 'district',
  },
];
